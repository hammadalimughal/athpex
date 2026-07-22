import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import InnerBanner from '../components/InnerBanner';
import { AiOutlineMail, AiOutlineLock, AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { FaApple } from 'react-icons/fa';

import { authService } from '../services/authService';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg('Please enter both email and password.');
      return;
    }
    setErrorMsg('');
    setLoading(true);

    const res = await authService.login(email, password);
    setLoading(false);

    if (res.success) {
      if (res.authtoken) {
        localStorage.setItem('athpex_token', res.authtoken);
      }
      if (res.user) {
        localStorage.setItem('athpex_user', JSON.stringify(res.user));
      }
      navigate('/checkout');
    } else {
      setErrorMsg(res.error || 'Failed to sign in. Please check your credentials.');
    }
  };

  return (
    <>
      <InnerBanner title="Sign In" />

      <section className="login-section py-20 bg-black text-white">
        <div className="container">
          <div className="max-w-md mx-auto">
            <div className="bg-[#0b0b0e] border border-neutral-800 rounded-3xl p-6 md:p-8 shadow-2xl">
              {/* Header */}
              <div className="text-center mb-8">
                <span className="tagline text-xs text-[#98B4E7] block mb-2 font-semibold">
                  WELCOME BACK ATHLETE
                </span>
                <h2 className="h2-dine text-white text-2xl md:text-3xl">Sign In To ATHPEX</h2>
                <p className="text-xs md:text-sm text-neutral-400 font-sans mt-1">
                  Access your orders, ambassador perks & saved stacks
                </p>
              </div>


              <div className="relative flex items-center justify-center mb-6">
                <div className="border-t border-neutral-800 w-full" />
                
              </div>

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {errorMsg && (
                  <div className="bg-red-950/50 border border-red-800/80 rounded-xl p-3 text-xs text-red-400">
                    {errorMsg}
                  </div>
                )}

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

                {/* Password Field */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="tagline text-xs text-neutral-400">Password *</label>
                    <Link
                      to="/forgot-password"
                      className="text-xs text-[#98B4E7] hover:underline font-sans"
                    >
                      Forgot Password?
                    </Link>
                  </div>
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
                </div>

                {/* Remember Me Checkbox */}
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="accent-[#98B4E7] w-4 h-4 cursor-pointer"
                  />
                  <label htmlFor="rememberMe" className="text-xs text-neutral-400 cursor-pointer font-sans">
                    Keep me signed in on this device
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="btn btn-primary w-full justify-center py-3.5 text-sm font-semibold tracking-wider cursor-pointer shadow-lg shadow-blue-500/20 mt-2"
                >
                  SIGN IN
                </button>
              </form>

              {/* Bottom Footer */}
              <div className="mt-8 pt-6 border-t border-neutral-800/80 text-center">
                <p className="text-xs text-neutral-400 font-sans">
                  Don't have an ATHPEX account?{' '}
                  <Link to="/signup" className="text-[#98B4E7] font-semibold hover:underline">
                    Create Account
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
