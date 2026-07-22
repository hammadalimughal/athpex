import React, { useRef } from 'react'
import HomeBanner from '../components/HomeBanner'
import gsap from 'gsap';
import * as THREE from 'three';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PreWorkout from '../components/PreWorkout';
import WhyChooseHome from '../components/WhyChooseHome';
import VideoTestimonials from '../components/VideoTestimonials';
import Testimonials from '../components/Testimonials';
import CallToAction from '../components/CallToAction';
gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const containerRef = useRef(null);
  const imgRef = useRef(null);
  const targetImageRef = useRef(null);

  useGSAP(() => {
    // 1. Initial banner animation (runs on mount)
    const tl = gsap.timeline({
      onComplete: () => {
        initScrollAnimation();
      }
    });

    tl.to(containerRef.current, {
      height: 600,          // GSAP smoothly calculates 'auto' behind the scenes!
      duration: 0.5,
      ease: 'power2.out'
    }, "+=1")
      .to(containerRef.current, {
        width: 600,           // Animates width right after height finishes
        duration: 1,
        rotate: -9,           // Resets rotation to 0 degrees
        ease: 'power2.out'
      }, "+=0.5");

    // 2. Scroll-driven animation targeting targetImageRef
    const getDeltaX = () => {
      if (!containerRef.current || !targetImageRef.current) return 0;
      const currentX = gsap.getProperty(containerRef.current, "x") || 0;

      const targetRect = targetImageRef.current.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();

      const targetCenterX = targetRect.left + targetRect.width / 2;
      const containerCenterX = containerRect.left + containerRect.width / 2 - currentX;

      return targetCenterX - containerCenterX;
    };

    const getDeltaY = () => {
      if (!containerRef.current || !targetImageRef.current) return 0;
      const currentY = gsap.getProperty(containerRef.current, "y") || 0;

      const targetRect = targetImageRef.current.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();

      const targetCenterY = targetRect.top + targetRect.height / 2;
      const containerCenterY = containerRect.top + containerRect.height / 2 - currentY;

      return (targetCenterY - containerCenterY);
    };

    const getTargetWidth = () => {
      if (!targetImageRef.current) return 600;
      // return targetImageRef.current.offsetWidth * 0.65;
      return targetImageRef.current.offsetWidth;
    };

    const getTargetHeight = () => {
      if (!targetImageRef.current) return 600;
      return targetImageRef.current.offsetHeight;
    };

    const initScrollAnimation = () => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".home-banner",
          start: "top top",          // Starts when banner top is at top of viewport
          endTrigger: targetImageRef.current,
          end: "center bottom",      // Ends when target image center is at center of viewport
          scrub: 1,                  // Smooth scrubbing synced to scrollbar
          invalidateOnRefresh: true, // Recalculate values on resize/refresh
        }
      });

      scrollTl.fromTo(containerRef.current,
        {
          width: 600,
          height: 600,
          rotate: -9,
          x: 0,
          y: 0,
          borderRadius: "0px"
        },
        {
          x: getDeltaX,
          y: getDeltaY,
          width: getTargetWidth,
          height: getTargetHeight,
          rotate: 0,
          borderRadius: "16px",
          ease: "none"
        }, 0)
        .fromTo(imgRef.current, {
          // width: 400,
          // height: 400,
          borderRadius: "5px"
        }, {
          width: getTargetWidth,
          height: getTargetHeight,
          borderRadius: "16px",
          ease: "none"
        }, 0);
    };

  });

  return (
    <>
      <div ref={containerRef} className="animated-product">
        <div className="wrapper">
          {/* <img src="/video-gif/smoke.gif" alt="" className="smoke-img" /> */}
          <img ref={imgRef} src="/images/pre-workout.png" alt="" />
        </div>
      </div>
      {/* <div
        ref={containerRef}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[1] overflow-hidden flex items-center justify-center h-0 w-[5px]"
      >
        <img
          ref={imgRef}
          src="/images/pre-workout.png"
          alt="Pre Workout"
          className="w-[400px] h-[400px] rounded-[5px] object-cover flex-shrink-0"
        />
      </div> */}
      <HomeBanner />
      <section className="feature-stack py-20">
        <div className="container">
          <div className="text-center">
            <h2 className="h2-airborne">Featured Stacks</h2>
            <p>Proven systems, tailored to your specific goals.</p>
          </div>
          <div className="grid grid-cols-2 gap-10 mt-10">
            <div className="col-span-1">
              <div className="featured-card">
                <img
                  ref={targetImageRef}
                  className="rounded-2xl"
                  src="/images/featured-stack/1.png"
                  alt=""
                  onLoad={() => ScrollTrigger.refresh()}
                />
                <div className="content">
                  <h3 className='h3-dine uppercase'>The Starter Stack</h3>
                  <p>We're here to help athletes and everyday performers unlock their full potential through science-backed nutrition they can trust.</p>
                  <span className="price">$39.99</span>
                </div>
              </div>
            </div>
            <div className="col-span-1">
              <div className="featured-card">
                <img className="rounded-2xl" src="/images/featured-stack/2.png" alt="" />
                <div className="content">
                  <h3 className='h3-dine uppercase'>Essential Performance Stack</h3>
                  <p>We're here to help athletes and everyday performers unlock their full potential through science-backed nutrition they can trust.</p>
                  <span className="price">$39.99</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <PreWorkout />
      <WhyChooseHome />
      <Testimonials />
      <VideoTestimonials />
      <CallToAction />
    </>
  )
}

export default Home
