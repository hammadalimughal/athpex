import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import InnerBanner from '../components/InnerBanner';
import { AiOutlineMail, AiOutlineCheckCircle, AiOutlineArrowLeft, AiOutlineSafety } from 'react-icons/ai';

import { authService } from '../services/authService';

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setErrorMsg('Please enter your email address.');
      return;
    }
    setErrorMsg('');
    setLoading(true);

    const res = await authService.forgotPassword(email);
    setLoading(false);

    if (res.success) {
      sessionStorage.setItem('athpex_reset_email', email);
      setIsSubmitted(true);
    } else {
      setErrorMsg(res.error || 'Failed to send OTP code. Please try again.');
    }
  };

  return (
    <>
      <InnerBanner title="Reset Password" />

      <section className="forgot-password-section py-20 bg-black text-white">
        <div className="container">
          <div className="max-w-md mx-auto">
            <div className="bg-[#0b0b0e] border border-neutral-800 rounded-3xl p-6 md:p-8 shadow-2xl relative">
              {/* Back to Login Link */}
              <Link
                to="/login"
                className="inline-flex items-center gap-1 text-xs text-neutral-400 hover:text-white mb-6 font-sans transition-colors"
              >
                <AiOutlineArrowLeft /> Back to Sign In
              </Link>

              {/* Header */}
              <div className="text-center mb-8">
                <span className="tagline text-xs text-[#98B4E7] block mb-2 font-semibold">
                  OTP VERIFICATION FLOW
                </span>
                <h2 className="h2-dine text-white text-2xl md:text-3xl">Forgot Your Password?</h2>
                <p className="text-xs md:text-sm text-neutral-400 font-sans mt-2">
                  Enter your registered email address and we'll send a 6-digit OTP security code to reset your password.
                </p>
              </div>

              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  {/* Email Field */}
                  <div>
                    <label className="tagline text-xs text-neutral-400 block mb-1">
                      Email Address *
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="athlete@athpex.com"
                        className="w-full bg-neutral-900 border border-neutral-800 text-white rounded-xl p-3 pl-10 text-sm focus:outline-none focus:border-[#98B4E7]"
                      />
                      <AiOutlineMail className="absolute left-3 top-3.5 text-neutral-500 text-lg" />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="btn btn-primary w-full justify-center py-3.5 text-sm font-semibold tracking-wider cursor-pointer shadow-lg shadow-blue-500/20 mt-2"
                  >
                    SEND OTP CODE
                  </button>
                </form>
              ) : (
                /* Success State */
                <div className="text-center py-4">
                  <div className="w-14 h-14 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center text-emerald-400 text-2xl mx-auto mb-4">
                    <AiOutlineCheckCircle />
                  </div>
                  <h3 className="h3-dine text-white text-xl mb-2">OTP Code Sent!</h3>
                  <p className="text-xs text-neutral-400 font-sans mb-6">
                    We've sent a 6-digit OTP security code to <strong className="text-white">{email}</strong>.
                  </p>
                  <button
                    onClick={() => navigate('/verify-otp')}
                    className="btn btn-primary w-full justify-center py-3.5 text-xs flex items-center gap-2 cursor-pointer"
                  >
                    <AiOutlineSafety className="text-lg" /> ENTER OTP CODE NOW
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
