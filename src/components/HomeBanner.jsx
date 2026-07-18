import React from 'react'
import SmokeEffect from './SmokeEffect'
import { Link } from 'react-router-dom'
const HomeBanner = () => {
  return (
    <section className="home-banner">
      <div className="content">
        <div className="container">
          <div className="grid grid-cols-3 gap-5">
            <div className="col-span-1 flex flex-col justify-center">
              <h1><span>Fuel your </span><span>energy</span></h1>
              <h3 className="uppercase">before the</h3>
              <h2>glory</h2>
              <h5 className="bordered-badge uppercase">
                <span>Pre-workout. </span>
                <span>Maximum Impact</span>
              </h5>
              <Link className="banner-btn uppercase">
                <span class="content-btn">unleash your potential </span>
                <span class="price-btn">$39.99</span>
              </Link>
            </div>
            <div className="col-span-1">
              <img src="/video-gif/smoke.gif" alt="" className="smoke-img" />
            </div>
            <div className="col-span-1">
              <img src="/images/player-basketball.png" alt="" className="player-img" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HomeBanner
