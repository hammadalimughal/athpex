const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');
const User = require('../models/User');
const sendMail = require('../utils/sendMail');
const mongoose = require('mongoose');

const emailOtpStore = new Map();

// Generate random 6-digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// In-memory store for rate limiting
const resetAttempts = new Map();

// Rate limiting helper
const checkRateLimit = (email) => {
  const now = Date.now();
  const attempts = resetAttempts.get(email) || { count: 0, lastAttempt: 0 };

  if (now - attempts.lastAttempt > 60 * 60 * 1000) {
    attempts.count = 0;
  }

  if (attempts.count >= 5) {
    return false;
  }

  attempts.count++;
  attempts.lastAttempt = now;
  resetAttempts.set(email, attempts);

  return true;
};

// Check email availability before OTP send
router.post('/check-availability', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, error: 'Email is required' });
    }

    const checkEmail = await User.findOne({ email });
    if (checkEmail) {
      return res.status(400).json({ success: false, error: 'Email already exists' });
    }

    return res.status(200).json({ success: true, message: 'Email is available' });
  } catch (err) {
    console.error('Availability check error:', err);
    return res.status(500).json({ success: false, error: err.message });
  }
});

// Send Email OTP (Replaced sendSMS with sendMail)
router.post('/send-email-otp', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, error: 'Email address is required' });
    }

    const otp = generateOTP();
    const expires = Date.now() + 10 * 60 * 1000; // 10 minutes

    emailOtpStore.set(email, {
      otp,
      expires,
      verified: false,
    });

    console.log(`[Email OTP] Generated OTP ${otp} for ${email}`);

    const emailSubject = 'ATHPEX Supplements - Verification Code';
    const emailBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #050505; color: #ffffff; padding: 30px; border-radius: 12px; border: 1px solid #222;">
        <h2 style="color: #98B4E7; text-align: center; font-size: 24px; margin-bottom: 5px;">ATHPEX SUPPLEMENTS</h2>
        <h4 style="color: #888888; text-align: center; margin-top: 0; text-transform: uppercase; font-size: 12px; letter-spacing: 2px;">Performance Verification</h4>
        <p style="color: #cccccc;">Hello,</p>
        <p style="color: #cccccc;">Your security OTP code for ATHPEX account verification is:</p>
        <div style="background-color: #111115; border: 1px solid #33333d; padding: 20px; text-align: center; margin: 25px 0; border-radius: 10px;">
          <h1 style="color: #e63b38; font-size: 38px; letter-spacing: 6px; margin: 0; font-family: monospace;">${otp}</h1>
        </div>
        <p style="color: #888888; font-size: 13px;">This OTP code is valid for 10 minutes. If you did not request this code, please ignore this email.</p>
        <hr style="border: none; border-top: 1px solid #222; margin: 25px 0;" />
        <p style="font-size: 12px; color: #666666; text-align: center;">© 2026 ATHPEX Supplements. All rights reserved.</p>
      </div>
    `;

    try {
      await sendMail(email, emailSubject, emailBody);
      return res.status(200).json({ success: true, message: 'OTP sent to your email address' });
    } catch (mailError) {
      console.error('Send Email Error:', mailError);
      return res.status(500).json({
        success: false,
        error: `Failed to send email: ${mailError.message}`,
      });
    }
  } catch (err) {
    console.error('Send email OTP error:', err);
    return res.status(500).json({ success: false, error: err.message });
  }
});

// Legacy endpoint mapping for backward compatibility
router.post('/send-phone-otp', async (req, res) => {
  req.body.email = req.body.email || req.body.phone;
  return router.handle(req, res);
});

// Verify Email OTP
router.post('/verify-email-otp', async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({ success: false, error: 'Email and OTP code are required' });
    }

    const otpRecord = emailOtpStore.get(email);
    if (!otpRecord) {
      return res.status(400).json({ success: false, error: 'No OTP code requested for this email address' });
    }

    if (otpRecord.expires < Date.now()) {
      emailOtpStore.delete(email);
      return res.status(400).json({ success: false, error: 'OTP code has expired. Please request a new code.' });
    }

    if (otpRecord.otp !== otp) {
      return res.status(400).json({ success: false, error: 'Invalid OTP verification code' });
    }

    emailOtpStore.set(email, {
      verified: true,
      expires: Date.now() + 15 * 60 * 1000,
    });

    return res.status(200).json({ success: true, message: 'Email verified successfully' });
  } catch (err) {
    console.error('Verify email OTP error:', err);
    return res.status(500).json({ success: false, error: err.message });
  }
});

// User Registration
router.post('/register', async (req, res) => {
  try {
    const { name, firstName, lastName, email, password, role = 'User' } = req.body;
    const fullName = name || `${firstName || ''} ${lastName || ''}`.trim();

    if (fullName && email && password) {
      const checkUser = await User.findOne({ email });
      if (checkUser) {
        return res.status(400).json({ success: false, error: 'An account with this email already exists' });
      }

      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);

      const newUser = await User.create({
        name: fullName,
        email,
        password: hashPassword,
        role: 'User',
      });

      const { _id, isProfileComplete } = newUser;
      const user = {
        id: _id,
        name: fullName,
        email,
        role: 'User',
        isProfileComplete,
      };

      const authtoken = jwt.sign(user, JWT_SECRET);
      return res
        .status(200)
        .cookie('authtoken', authtoken)
        .json({ success: true, authtoken, user, message: 'Registration successful' });
    } else {
      return res.status(400).json({ success: false, error: 'Please fill in all required fields' });
    }
  } catch (err) {
    console.error('Registration error:', err.message);
    return res.status(500).json({ success: false, error: err.message });
  }
});

// User Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email && password) {
      const checkUser = await User.findOne({ email });
      if (!checkUser) {
        return res.status(400).json({ success: false, error: 'Invalid credentials' });
      }

      const checkPassword = await bcrypt.compare(password, checkUser.password);
      if (!checkPassword) {
        return res.status(400).json({ success: false, error: 'Invalid credentials' });
      }

      const { _id, name, role, isProfileComplete } = checkUser;
      const user = {
        id: _id,
        name,
        email,
        role,
        isProfileComplete,
      };

      const authtoken = jwt.sign(user, JWT_SECRET);
      return res
        .status(200)
        .cookie('authtoken', authtoken)
        .json({ success: true, authtoken, user, message: 'Login successful' });
    } else {
      return res.status(400).json({ success: false, error: 'Email and password are required' });
    }
  } catch (err) {
    console.error('Login error:', err.message);
    return res.status(500).json({ success: false, error: err.message });
  }
});

// Forgot Password - Send OTP via Email
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, error: 'Email address is required' });
    }

    if (!checkRateLimit(email)) {
      return res
        .status(400)
        .json({ success: false, error: 'Too many reset attempts. Please try again in 1 hour.' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, error: 'No account found with this email address' });
    }

    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    await User.findByIdAndUpdate(user._id, {
      resetPasswordOTP: otp,
      resetPasswordOTPExpires: otpExpires,
    });

    const emailSubject = 'ATHPEX Supplements - Password Reset OTP';
    const emailBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #050505; color: #ffffff; padding: 30px; border-radius: 12px; border: 1px solid #222;">
        <h2 style="color: #98B4E7; text-align: center; font-size: 24px; margin-bottom: 5px;">ATHPEX SUPPLEMENTS</h2>
        <h4 style="color: #888888; text-align: center; margin-top: 0; text-transform: uppercase; font-size: 12px; letter-spacing: 2px;">Password Reset Request</h4>
        <p style="color: #cccccc;">Hello ${user.name || 'Athlete'},</p>
        <p style="color: #cccccc;">You requested to reset your password. Use the following 6-digit OTP code to complete your password reset:</p>
        <div style="background-color: #111115; border: 1px solid #33333d; padding: 20px; text-align: center; margin: 25px 0; border-radius: 10px;">
          <h1 style="color: #e63b38; font-size: 38px; letter-spacing: 6px; margin: 0; font-family: monospace;">${otp}</h1>
        </div>
        <p style="color: #888888; font-size: 13px;">This OTP code expires in 10 minutes. If you did not request this, please ignore this email.</p>
        <hr style="border: none; border-top: 1px solid #222; margin: 25px 0;" />
        <p style="font-size: 12px; color: #666666; text-align: center;">© 2026 ATHPEX Supplements. All rights reserved.</p>
      </div>
    `;

    try {
      console.log(`[Password Reset] Sending OTP code: ${otp} to ${email}`);
      await sendMail(email, emailSubject, emailBody);
    } catch (error) {
      console.error('Error sending password reset email:', error);
    }

    return res.status(200).json({ success: true, message: 'OTP sent to your email address' });
  } catch (err) {
    console.error('Forgot password error:', err.message);
    return res.status(500).json({ success: false, error: err.message });
  }
});

// Verify Password Reset OTP
router.post('/verify-otp', async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ success: false, error: 'Email and OTP code are required' });
    }

    const user = await User.findOne({
      email,
      resetPasswordOTP: otp,
      resetPasswordOTPExpires: { $gt: new Date() },
    });

    if (!user) {
      return res.status(400).json({ success: false, error: 'Invalid or expired OTP code' });
    }

    const resetToken = jwt.sign({ userId: user._id, email }, JWT_SECRET, { expiresIn: '15m' });
    return res.status(200).json({ success: true, resetToken, message: 'OTP code verified successfully' });
  } catch (err) {
    console.error('Verify OTP error:', err.message);
    return res.status(500).json({ success: false, error: err.message });
  }
});

// Resend Password Reset OTP
router.post('/resend-otp', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, error: 'Email address is required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, error: 'No account found with this email address' });
    }

    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

    await User.findByIdAndUpdate(user._id, {
      resetPasswordOTP: otp,
      resetPasswordOTPExpires: otpExpires,
    });

    const emailSubject = 'ATHPEX Supplements - Password Reset OTP';
    const emailBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #050505; color: #ffffff; padding: 30px; border-radius: 12px; border: 1px solid #222;">
        <h2 style="color: #98B4E7; text-align: center; font-size: 24px; margin-bottom: 5px;">ATHPEX SUPPLEMENTS</h2>
        <h4 style="color: #888888; text-align: center; margin-top: 0; text-transform: uppercase; font-size: 12px; letter-spacing: 2px;">New Password Reset Code</h4>
        <p style="color: #cccccc;">Hello ${user.name || 'Athlete'},</p>
        <p style="color: #cccccc;">Here is your new 6-digit OTP security code for password reset:</p>
        <div style="background-color: #111115; border: 1px solid #33333d; padding: 20px; text-align: center; margin: 25px 0; border-radius: 10px;">
          <h1 style="color: #e63b38; font-size: 38px; letter-spacing: 6px; margin: 0; font-family: monospace;">${otp}</h1>
        </div>
        <p style="color: #888888; font-size: 13px;">This code expires in 10 minutes.</p>
        <hr style="border: none; border-top: 1px solid #222; margin: 25px 0;" />
        <p style="font-size: 12px; color: #666666; text-align: center;">© 2026 ATHPEX Supplements. All rights reserved.</p>
      </div>
    `;

    try {
      console.log(`[Resend OTP] Sending code: ${otp} to ${email}`);
      await sendMail(email, emailSubject, emailBody);
    } catch (error) {
      console.error('Error resending OTP email:', error);
    }

    return res.status(200).json({ success: true, message: 'New OTP sent to your email address' });
  } catch (err) {
    console.error('Resend OTP error:', err.message);
    return res.status(500).json({ success: false, error: err.message });
  }
});

// Reset Password
router.post('/reset-password', async (req, res) => {
  try {
    const { token, newPassword, confirmPassword } = req.body;

    if (!token || !newPassword || !confirmPassword) {
      return res.status(400).json({ success: false, error: 'All fields are required' });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ success: false, error: 'Passwords do not match' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ success: false, error: 'Password must be at least 6 characters long' });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      return res.status(400).json({ success: false, error: 'Invalid or expired reset token' });
    }

    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(400).json({ success: false, error: 'User not found' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(newPassword, salt);

    await User.findByIdAndUpdate(user._id, {
      password: hashPassword,
      resetPasswordOTP: null,
      resetPasswordOTPExpires: null,
    });

    return res.status(200).json({
      success: true,
      message: 'Password reset successfully. Please sign in with your new password.',
    });
  } catch (err) {
    console.error('Reset password error:', err.message);
    return res.status(500).json({ success: false, error: err.message });
  }
});

// Logout
router.get('/logout', (req, res) => {
  res.clearCookie('authtoken');
  res.json({ success: true, message: 'Logged out successfully' });
});

// Get User Profile
router.get('/getuser', async (req, res) => {
  try {
    const token = req.headers['authtoken'];
    if (!token) return res.status(401).json({ success: false, error: 'No token provided' });
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password -resetPasswordOTP -resetPasswordOTPExpires');
    if (!user) return res.status(404).json({ success: false, error: 'User not found' });
    return res.status(200).json({ success: true, user });
  } catch (err) {
    return res.status(401).json({ success: false, error: 'Invalid token' });
  }
});

module.exports = router;