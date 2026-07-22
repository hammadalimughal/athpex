import { Search } from 'lucide-react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import $ from 'jquery'
import { AiOutlineUser, AiOutlineShoppingCart, AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

const Header = () => {
  const [scroll, setScroll] = useState('main-header')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  $(window).scroll(function (e) {
    var scroll = $(window).scrollTop();
    if (scroll >= 100) {
      setScroll('main-header scroll')
    }
    else {
      setScroll('main-header')
    }
  })

  return (
    <header className={scroll}>
      <div className="container">
        <div className="flex justify-between items-center">
          <Link to="/" className="navbar-brand">
            <img src="/images/logo.png" alt="Athpex Supplements" className="logo" />
          </Link>

          {/* Desktop Navigation */}
          <ul className="navbar-nav hidden lg:flex">
            <li> <Link to="/" className="nav-link">Home</Link></li>
            <li> <Link to="/flagship-product" className="nav-link">Flagship Product</Link></li>
            <li> <Link to="/why-athpex-supplements" className="nav-link">Why Athpex Supplements</Link></li>
            <li> <Link to="/community-ambassador" className="nav-link">Community / Ambassador</Link></li>
            <li> <Link to="/our-standard" className="nav-link">Our Standard</Link></li>
            <li> <Link to="/contact-us" className="nav-link">Contact Us</Link></li>
          </ul>

          <ul className="navbar-nav icon-nav flex items-center gap-3">
            <li>
              <Link
                to={localStorage.getItem('athpex_token') ? '/dashboard' : '/login'}
                title={localStorage.getItem('athpex_token') ? 'Dashboard' : 'Account'}
                className="nav-link"
              >
                <AiOutlineUser />
              </Link>
            </li>
            <li> <Link to="/checkout" title="Checkout" className="nav-link"><AiOutlineShoppingCart /></Link></li>
            
            {/* Hamburger Toggle (Mobile/Tablet) */}
            <li className="lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-white text-2xl p-1 cursor-pointer focus:outline-none"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Mobile Slide-down Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-black/95 border-b border-neutral-800 backdrop-blur-md px-6 py-6 transition-all duration-300">
          <ul className="flex flex-col gap-4 text-left">
            <li>
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="text-white text-lg font-medium block py-2 border-b border-neutral-800 font-['DIN_Pro',sans-serif]">
                Hero
              </Link>
            </li>
            <li>
              <Link to="/flagship-product" onClick={() => setIsMobileMenuOpen(false)} className="text-white text-lg font-medium block py-2 border-b border-neutral-800 font-['DIN_Pro',sans-serif]">
                Flagship Product
              </Link>
            </li>
            <li>
              <Link to="/why-athpex-supplements" onClick={() => setIsMobileMenuOpen(false)} className="text-white text-lg font-medium block py-2 border-b border-neutral-800 font-['DIN_Pro',sans-serif]">
                Why Athpex Supplements
              </Link>
            </li>
            <li>
              <Link to="/community-ambassador" onClick={() => setIsMobileMenuOpen(false)} className="text-white text-lg font-medium block py-2 border-b border-neutral-800 font-['DIN_Pro',sans-serif]">
                Community / Ambassador
              </Link>
            </li>
            <li>
              <Link to="/our-standard" onClick={() => setIsMobileMenuOpen(false)} className="text-white text-lg font-medium block py-2 border-b border-neutral-800 font-['DIN_Pro',sans-serif]">
                Our Standard
              </Link>
            </li>
            <li>
              <Link to="/contact-us" onClick={() => setIsMobileMenuOpen(false)} className="text-white text-lg font-medium block py-2 font-['DIN_Pro',sans-serif]">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}

export default Header
