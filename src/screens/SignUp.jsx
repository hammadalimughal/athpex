import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import InnerBanner from '../components/InnerBanner';
import { AiOutlineMail, AiOutlineLock, AiOutlineUser, AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { FaApple } from 'react-icons/fa';

import { authService } from '../services/authService';

export default function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: true,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setErrorMsg('Passwords do not match. Please re-enter.');
      return;
    }
    if (!formData.agreeTerms) {
      setErrorMsg('You must agree to the Terms of Service to create an account.');
      return;
    }
    setErrorMsg('');
    setLoading(true);

    const fullName = `${formData.firstName} ${formData.lastName}`.trim();
    const res = await authService.register(fullName, formData.email, formData.password);
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
      setErrorMsg(res.error || 'Failed to create account. Please try again.');
    }
  };

  return (
    <>
      <InnerBanner title="Create Account" />

      <section className="signup-section py-20 bg-black text-white">
        <div className="container">
          <div className="max-w-lg mx-auto">
            <div className="bg-[#0b0b0e] border border-neutral-800 rounded-3xl p-6 md:p-8 shadow-2xl">
              {/* Header */}
              <div className="text-center mb-8">
                <span className="tagline text-xs text-[#98B4E7] block mb-2 font-semibold">
                  JOIN THE MOVEMENT
                </span>
                <h2 className="h2-dine text-white text-2xl md:text-3xl">Create ATHPEX Account</h2>
                <p className="text-xs md:text-sm text-neutral-400 font-sans mt-1">
                  Unlock 15% off your first pre-workout order & ambassador rewards
                </p>
              </div>


              <div className="relative flex items-center justify-center mb-6">
                <div className="border-t border-neutral-800 w-full" />
              </div>

              {/* SignUp Form */}
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {errorMsg && (
                  <div className="bg-red-950/50 border border-red-800/80 rounded-xl p-3 text-xs text-red-400">
                    {errorMsg}
                  </div>
                )}

                {/* Name Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="tagline text-xs text-neutral-400 block mb-1">
                      First Name *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="firstName"
                        required
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="John"
                        className="w-full bg-neutral-900 border border-neutral-800 text-white rounded-xl p-3 pl-10 text-sm focus:outline-none focus:border-[#98B4E7]"
                      />
                      <AiOutlineUser className="absolute left-3 top-3.5 text-neutral-500 text-lg" />
                    </div>
                  </div>

                  <div>
                    <label className="tagline text-xs text-neutral-400 block mb-1">
                      Last Name *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="lastName"
                        required
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Doe"
                        className="w-full bg-neutral-900 border border-neutral-800 text-white rounded-xl p-3 pl-10 text-sm focus:outline-none focus:border-[#98B4E7]"
                      />
                      <AiOutlineUser className="absolute left-3 top-3.5 text-neutral-500 text-lg" />
                    </div>
                  </div>
                </div>

                {/* Email Field */}
                <div>
                  <label className="tagline text-xs text-neutral-400 block mb-1">
                    Email Address *
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="athlete@athpex.com"
                      className="w-full bg-neutral-900 border border-neutral-800 text-white rounded-xl p-3 pl-10 text-sm focus:outline-none focus:border-[#98B4E7]"
                    />
                    <AiOutlineMail className="absolute left-3 top-3.5 text-neutral-500 text-lg" />
                  </div>
                </div>

                {/* Password Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="tagline text-xs text-neutral-400 block mb-1">
                      Password *
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        required
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="••••••••••••"
                        className="w-full bg-neutral-900 border border-neutral-800 text-white rounded-xl p-3 pl-10 text-sm focus:outline-none focus:border-[#98B4E7]"
                      />
                      <AiOutlineLock className="absolute left-3 top-3.5 text-neutral-500 text-lg" />
                    </div>
                  </div>

                  <div>
                    <label className="tagline text-xs text-neutral-400 block mb-1">
                      Confirm Password *
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        required
                        value={formData.confirmPassword}
                        onChange={handleChange}
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
                </div>

                {/* Terms Checkbox */}
                <div className="flex items-center gap-2 mt-2">
                  <input
                    type="checkbox"
                    id="agreeTerms"
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleChange}
                    className="accent-[#98B4E7] w-4 h-4 cursor-pointer"
                  />
                  <label htmlFor="agreeTerms" className="text-xs text-neutral-400 cursor-pointer font-sans">
                    I agree to the ATHPEX <a href="#terms" className="text-[#98B4E7] underline">Terms of Service</a> & <a href="#privacy" className="text-[#98B4E7] underline">Privacy Policy</a>
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="btn btn-primary w-full justify-center py-3.5 text-sm font-semibold tracking-wider cursor-pointer shadow-lg shadow-blue-500/20 mt-2"
                >
                  CREATE ACCOUNT
                </button>
              </form>

              {/* Bottom Footer */}
              <div className="mt-8 pt-6 border-t border-neutral-800/80 text-center">
                <p className="text-xs text-neutral-400 font-sans">
                  Already have an account?{' '}
                  <Link to="/login" className="text-[#98B4E7] font-semibold hover:underline">
                    Sign In
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
