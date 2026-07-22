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
import { CartProvider } from './context/CartContext'

const App = () => {
  return (
    <CartProvider>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/flagship-product" element={<FlagshipProduct />} />
        <Route path="/community-ambassador" element={<CommunityAmbassador />} />
        <Route path="/our-standard" element={<OurStandard />} />
        <Route path="/why-athpex-supplements" element={<WhyAthpexSupplements />} />
        <Route path="/cart" element={<Navigate to="/checkout" replace />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/contact-us" element={<ContactUs />} />
      </Routes>
      <Footer />
    </CartProvider>
  )
}

export default App
