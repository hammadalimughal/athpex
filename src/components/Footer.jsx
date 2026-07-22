import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="footer-section pt-20">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8">
          <div className="col-span-1 sm:col-span-2">
            <p>Clinically dosed sports nutrition engineered for athletes
              who refuse to settle. Get 15% off your first order.</p>
            <div className="newsletter-form flex flex-wrap gap-2 mt-3">
              <input type="email" placeholder="Email Address" className="w-full sm:w-auto flex-grow" />
              <button className="btn btn-primary !py-2 text-xs shrink-0">Get 15%</button>
            </div>
          </div>
          <div className="col-span-1">
            <h5>Company</h5>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/flagship-product">Flagship Products</Link></li>
              <li><Link to="/why-athpex-supplements">Why Athpex Supplements</Link></li>
              <li><Link to="/community-ambassador">Community / Ambassador</Link></li>
              <li><Link to="/contact-us">Contact Us</Link></li>
            </ul>
          </div>
          <div className="col-span-1">
             <h5>Support</h5>
            <ul>
              <li><Link to="/our-standard">Our Standard</Link></li>
              <li><Link to="/checkout">Checkout</Link></li>
              <li><Link to="/contact-us">FAQ & Contact</Link></li>
            </ul>
          </div>
          <div className="col-span-1 sm:col-span-2">
            <img src="/images/awards.png" alt="Awards" className="max-w-full h-auto" />
          </div>
        </div>
        <div className="copyright mt-10 flex flex-col sm:flex-row justify-between items-center text-center gap-2">
          <p>© 2026 ATHPEX. All rights reserved.</p>
          <p>Designed By <a href="https://sylexstudio.com/" target="_blank" rel="noopener noreferrer">Sylex Studio</a></p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
