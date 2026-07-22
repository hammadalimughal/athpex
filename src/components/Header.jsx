import { Search } from 'lucide-react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import $ from 'jquery'
import { AiOutlineUser, AiOutlineShoppingCart  } from "react-icons/ai";

const Header = () => {
  const [scroll, setScroll] = useState('main-header')
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
          <ul className="navbar-nav">
            <li> <Link to="/" className="nav-link">Hero</Link></li>
            <li> <Link to="/flagship-product" className="nav-link">Flagship Product</Link></li>
            <li> <Link to="/why-athpex-supplements" className="nav-link">Why Athpex Supplements</Link></li>
            <li> <Link to="/community-ambassador" className="nav-link">Community / Ambassador</Link></li>
            <li> <Link to="/our-standard" className="nav-link">Our Standard</Link></li>
            <li> <Link to="/contact-us" className="nav-link">Contact Us</Link></li>
          </ul>
          <ul className="navbar-nav icon-nav">
            <li> <Link to="/" title="Account" className="nav-link"><AiOutlineUser /></Link></li>
            <li> <Link to="/checkout" title="Checkout" className="nav-link"><AiOutlineShoppingCart /></Link></li>
          </ul>

        </div>
      </div>
    </header>
  )
}

export default Header
