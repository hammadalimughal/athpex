import { API_BASE } from '../config/data';

// Helper for making API requests with JSON headers and cookies
const apiFetch = async (endpoint, method = 'GET', data = null, headers = {}) => {
  const url = `${API_BASE}${endpoint}`;
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  };

  const storedToken = localStorage.getItem('athpex_token');
  if (storedToken) {
    options.headers['authtoken'] = storedToken;
  }

  if (data) {
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(`API Request Error [${method} ${endpoint}]:`, error);
    return { success: false, error: error.message || 'Network request failed' };
  }
};

export const authService = {
  // Check email availability
  checkAvailability: (email) => apiFetch('/auth/check-availability', 'POST', { email }),

  // Send Email OTP for registration / verification
  sendEmailOTP: (email) => apiFetch('/auth/send-email-otp', 'POST', { email }),

  // Verify Email OTP
  verifyEmailOTP: (email, otp) => apiFetch('/auth/verify-email-otp', 'POST', { email, otp }),

  // User Registration
  register: (name, email, password) => apiFetch('/auth/register', 'POST', { name, email, password }),

  // User Login
  login: (email, password) => apiFetch('/auth/login', 'POST', { email, password }),

  // Forgot Password (Sends OTP to Email)
  forgotPassword: (email) => apiFetch('/auth/forgot-password', 'POST', { email }),

  // Verify Forgot Password OTP
  verifyOTP: (email, otp) => apiFetch('/auth/verify-otp', 'POST', { email, otp }),

  // Resend OTP
  resendOTP: (email) => apiFetch('/auth/resend-otp', 'POST', { email }),

  // Reset Password using token
  resetPassword: (token, newPassword, confirmPassword) =>
    apiFetch('/auth/reset-password', 'POST', { token, newPassword, confirmPassword }),

  // Get Current User Profile
  getCurrentUser: () => apiFetch('/auth/getuser', 'GET'),

  // Logout
  logout: () => {
    localStorage.removeItem('athpex_token');
    localStorage.removeItem('athpex_user');
    return apiFetch('/auth/logout', 'GET');
  },
};
