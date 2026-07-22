import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function HomeBanner() {
  const containerRef = useRef(null);

  // Helper function to split text string into animated character spans
  const renderSplitText = (text, charClassName) => {
    return text.split('').map((char, index) => (
      <span key={index} className="inline-block overflow-hidden py-1">
        <span className={`inline-block split-char ${charClassName}`}>
          {char === ' ' ? '\u00A0' : char}
        </span>
      </span>
    ));
  };

  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: { ease: 'power4.out', duration: 1 },
      });

      // Split text timeline sequence
      tl.fromTo(
        '.h1-char',
        {
          y: '120%',
          opacity: 0,
          rotateX: -80,
        },
        {
          y: '0%',
          opacity: 1,
          rotateX: 0,
          stagger: 0.035,
          duration: 0.9,
        },
        0.2
      )
        .fromTo(
          '.h3-char',
          {
            y: '120%',
            opacity: 0,
            rotateY: 45,
          },
          {
            y: '0%',
            opacity: 1,
            rotateY: 0,
            stagger: 0.04,
            duration: 0.85,
          },
          '-=0.6'
        )
        .fromTo(
          '.h2-char',
          {
            y: '130%',
            opacity: 0,
            scale: 0.7,
            rotateX: -90,
          },
          {
            y: '0%',
            opacity: 1,
            scale: 1,
            rotateX: 0,
            stagger: 0.06,
            duration: 1.1,
          },
          '-=0.6'
        )
        .fromTo(
          '.banner-badge-anim',
          {
            y: 25,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
          },
          '-=0.5'
        )
        .fromTo(
          '.banner-btn-anim',
          {
            y: 30,
            opacity: 0,
            scale: 0.9,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.85,
            ease: 'back.out(1.7)',
          },
          '-=0.6'
        );
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="home-banner overflow-hidden select-none">
      <div className="content">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-center">
            {/* Split Text Content Column */}
            <div className="col-span-1 flex flex-col justify-center text-center md:text-left z-10">
              {/* Split Heading H1 */}
              <h1>
                <span className="inline-block whitespace-nowrap">
                  {renderSplitText('Fuel your', 'h1-char')}
                </span>{' '}
                <span className="inline-block whitespace-nowrap">
                  {renderSplitText('energy', 'h1-char')}
                </span>
              </h1>

              {/* Split Heading H3 */}
              <h3 className="uppercase">
                <span className="inline-block whitespace-nowrap">
                  {renderSplitText('before the', 'h3-char')}
                </span>
              </h3>

              {/* Split Heading H2 */}
              <h2>
                <span className="inline-block whitespace-nowrap">
                  {renderSplitText('glory', 'h2-char')}
                </span>
              </h2>

              {/* Badge */}
              <h5 className="bordered-badge uppercase banner-badge-anim">
                <span>Pre-workout. </span>
                <span>Maximum Impact</span>
              </h5>

              {/* Action Button */}
              <div className="banner-btn-anim inline-block mt-4">
                <Link to="/checkout" className="banner-btn uppercase">
                  <span className="content-btn">unleash your potential </span>
                  <span className="price-btn">$39.99</span>
                </Link>
              </div>
            </div>

            {/* Smoke / Background Image */}
            <div className="col-span-1 hidden md:block">
              <img src="/video-gif/smoke.gif" alt="Smoke Effect" className="smoke-img" />
            </div>

            {/* Player Featured Graphic */}
            <div className="col-span-1 flex justify-center relative">
              <img
                src="/images/player-basketball.png"
                alt="Basketball Athlete"
                className="player-img max-w-full h-auto"
              />
              <img
                src="/images/connor-keyes.svg"
                alt="Connor Keyes"
                className="player-name absolute bottom-0 right-0 w-[300px] h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
