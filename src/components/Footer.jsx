import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="footer-section pt-20">
      <div className="container">
        <div className="grid grid-cols-6 gap-10">
          <div className="col-span-2">
            <p>Clinically dosed sports nutrition engineered for athletes
              who refuse to settle. Get 15% off your first order.</p>
            <div className="newsletter-form">
              <input type="email" placeholder="Email Address" />
              <button>Get 15%</button>
            </div>
          </div>
          <div className="col-span-1">
            <h5>Company</h5>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/">Flagship Products</Link></li>
              <li><Link to="/">Why Athpex Supplements</Link></li>
              <li><Link to="/">Community / Ambassador</Link></li>
              <li><Link to="/">Contact Us</Link></li>
            </ul>
          </div>
          <div className="col-span-1">
             <h5>Support</h5>
            <ul>
              <li><Link to="/">Shipping</Link></li>
              <li><Link to="/">Returns</Link></li>
              <li><Link to="/">FAQ</Link></li>
              <li><Link to="/">Contact</Link></li>
              <li><Link to="/">Track order</Link></li>
            </ul>
          </div>
          <div className="col-span-2">
            <img src="/images/awards.png" alt="Awards" />
          </div>
        </div>
        <div className="copyright mt-10">
          <p>© 2026 ATHPEX. All rights reserved.</p>
          <p>Designed By <a href="https://sylexstudio.com/" target="_blank" rel="noopener noreferrer">Sylex Studio</a></p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
