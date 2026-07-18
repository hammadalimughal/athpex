import { Search } from 'lucide-react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import $ from 'jquery'

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
            <li> <Link to="/" className="nav-link">Flagship Product</Link></li>
            <li> <Link to="/" className="nav-link">Why Athpex Supplements</Link></li>
            <li> <Link to="/community-ambassador" className="nav-link">Community / Ambassador</Link></li>
            <li> <Link to="/" className="nav-link">Our Standard</Link></li>
            <li> <Link to="/" className="nav-link">Contact Us</Link></li>
          </ul>
          <ul className="navbar-nav">
            <li> <Link to="/" className="nav-link"><Search /> Search</Link></li>
            <li> <Link to="/" className="nav-link">Quiz</Link></li>
            <li> <Link to="/" className="nav-link">Learn</Link></li>
            <li> <Link to="/" className="nav-link">Account</Link></li>
            <li> <Link to="/" className="nav-link">Cart</Link></li>
          </ul>

        </div>
      </div>
    </header>
  )
}

export default Header
