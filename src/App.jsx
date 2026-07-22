import React from 'react'
import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './screens/Home'
import Header from './components/Header'
import CommunityAmbassador from './screens/CommunityAmbassador'
import Footer from './components/Footer'
import FlagshipProduct from './screens/FlagshipProduct'
import OurStandard from './screens/OurStandard'
import WhyAthpexSupplements from './screens/WhyAthpexSupplements'
import Checkout from './screens/Checkout'
import ContactUs from './screens/ContactUs'
import Login from './screens/Login'
import SignUp from './screens/SignUp'
import ForgotPassword from './screens/ForgotPassword'
import OTPVerification from './screens/OTPVerification'
import ResetPassword from './screens/ResetPassword'
import Dashboard from './screens/Dashboard'
import { ProtectedRoute, GuestRoute } from './components/RouteGuards'
import { CartProvider } from './context/CartContext'

const App = () => {
  return (
    <CartProvider>
      <Header />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/flagship-product" element={<FlagshipProduct />} />
        <Route path="/community-ambassador" element={<CommunityAmbassador />} />
        <Route path="/our-standard" element={<OurStandard />} />
        <Route path="/why-athpex-supplements" element={<WhyAthpexSupplements />} />
        <Route path="/cart" element={<Navigate to="/checkout" replace />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<OTPVerification />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Guest Only Routes (Redirects to /dashboard if already logged in) */}
        <Route element={<GuestRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>

        {/* Protected User Routes (Redirects to /login if not logged in) */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
      <Footer />
    </CartProvider>
  )
}

export default App
