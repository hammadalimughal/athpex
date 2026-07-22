import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

// ProtectedRoute: Allows access only if logged in
export const ProtectedRoute = () => {
  const token = localStorage.getItem('athpex_token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

// GuestRoute: Restricts access if already logged in (redirects to /dashboard)
export const GuestRoute = () => {
  const token = localStorage.getItem('athpex_token');
  if (token) {
    return <Navigate to="/dashboard" replace />;
  }
  return <Outlet />;
};
