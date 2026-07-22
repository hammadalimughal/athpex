import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import InnerBanner from '../components/InnerBanner';
import { AiOutlineLock, AiOutlineEye, AiOutlineEyeInvisible, AiOutlineCheckCircle } from 'react-icons/ai';

import { authService } from '../services/authService';

export default function ResetPassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const resetToken = sessionStorage.getItem('athpex_reset_token') || '';

  // Password strength calculation
  const getStrength = (pass) => {
    if (!pass) return { label: '', color: 'bg-neutral-800', width: '0%' };
    if (pass.length < 6) return { label: 'Weak', color: 'bg-red-500', width: '33%' };
    if (pass.length < 10) return { label: 'Medium', color: 'bg-yellow-500', width: '66%' };
    return { label: 'Strong', color: 'bg-emerald-500', width: '100%' };
  };

  const strength = getStrength(password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 6) {
      setErrorMsg('Password must be at least 6 characters long.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }
    if (!resetToken) {
      setErrorMsg('Reset token missing or expired. Please restart password recovery.');
      return;
    }
    setErrorMsg('');
    setLoading(true);

    const res = await authService.resetPassword(resetToken, password, confirmPassword);
    setLoading(false);

    if (res.success) {
      sessionStorage.removeItem('athpex_reset_token');
      sessionStorage.removeItem('athpex_reset_email');
      setIsSuccess(true);
    } else {
      setErrorMsg(res.error || 'Failed to reset password. Please try again.');
    }
  };

  return (
    <>
      <InnerBanner title="Set New Password" />

      <section className="reset-password-section py-20 bg-black text-white">
        <div className="container">
          <div className="max-w-md mx-auto">
            <div className="bg-[#0b0b0e] border border-neutral-800 rounded-3xl p-6 md:p-8 shadow-2xl">
              {/* Header */}
              <div className="text-center mb-8">
                <span className="tagline text-xs text-[#98B4E7] block mb-2 font-semibold">
                  SECURE YOUR ACCOUNT
                </span>
                <h2 className="h2-dine text-white text-2xl md:text-3xl">Set New Password</h2>
                <p className="text-xs md:text-sm text-neutral-400 font-sans mt-2">
                  Please enter a new secure password for your ATHPEX account.
                </p>
              </div>

              {!isSuccess ? (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  {errorMsg && (
                    <div className="bg-red-950/50 border border-red-800/80 rounded-xl p-3 text-xs text-red-400">
                      {errorMsg}
                    </div>
                  )}

                  {/* New Password Field */}
                  <div>
                    <label className="tagline text-xs text-neutral-400 block mb-1">
                      New Password *
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full bg-neutral-900 border border-neutral-800 text-white rounded-xl p-3 pl-10 pr-10 text-sm focus:outline-none focus:border-[#98B4E7]"
                      />
                      <AiOutlineLock className="absolute left-3 top-3.5 text-neutral-500 text-lg" />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3.5 text-neutral-500 hover:text-white cursor-pointer"
                      >
                        {showPassword ? <AiOutlineEyeInvisible className="text-lg" /> : <AiOutlineEye className="text-lg" />}
                      </button>
                    </div>

                    {/* Password Strength Indicator */}
                    {password && (
                      <div className="mt-2">
                        <div className="flex justify-between items-center text-[10px] text-neutral-400 mb-1">
                          <span>Password Strength:</span>
                          <span className="font-semibold text-white">{strength.label}</span>
                        </div>
                        <div className="w-full bg-neutral-900 h-1.5 rounded-full overflow-hidden">
                          <div
                            className={`h-full transition-all duration-300 ${strength.color}`}
                            style={{ width: strength.width }}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Confirm New Password Field */}
                  <div>
                    <label className="tagline text-xs text-neutral-400 block mb-1">
                      Confirm New Password *
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full bg-neutral-900 border border-neutral-800 text-white rounded-xl p-3 pl-10 text-sm focus:outline-none focus:border-[#98B4E7]"
                      />
                      <AiOutlineLock className="absolute left-3 top-3.5 text-neutral-500 text-lg" />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="btn btn-primary w-full justify-center py-3.5 text-sm font-semibold tracking-wider cursor-pointer shadow-lg shadow-blue-500/20 mt-2"
                  >
                    UPDATE PASSWORD
                  </button>
                </form>
              ) : (
                /* Success State */
                <div className="text-center py-4">
                  <div className="w-14 h-14 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center text-emerald-400 text-2xl mx-auto mb-4">
                    <AiOutlineCheckCircle />
                  </div>
                  <h3 className="h3-dine text-white text-xl mb-2">Password Updated!</h3>
                  <p className="text-xs text-neutral-400 font-sans mb-6">
                    Your password has been successfully updated. You can now sign in with your new credentials.
                  </p>
                  <button
                    onClick={() => navigate('/login')}
                    className="btn btn-primary w-full justify-center py-3.5 text-sm font-semibold"
                  >
                    SIGN IN NOW
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
