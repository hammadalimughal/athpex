import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// Dummy video/image data (Replace with your actual imports or API data)
const SLIDES_DATA = [
    { id: 1, image: '/images/video-testimonials-thumb/1.png', videoUrl: '#' },
    { id: 2, image: '/images/video-testimonials-thumb/2.png', videoUrl: '#' },
    { id: 3, image: '/images/video-testimonials-thumb/3.png', videoUrl: '#' },
    { id: 4, image: '/images/video-testimonials-thumb/4.png', videoUrl: '#' },
    { id: 5, image: '/images/video-testimonials-thumb/5.png', videoUrl: '#' },
    { id: 6, image: '/images/video-testimonials-thumb/1.png', videoUrl: '#' },
    { id: 7, image: '/images/video-testimonials-thumb/2.png', videoUrl: '#' },
    { id: 8, image: '/images/video-testimonials-thumb/3.png', videoUrl: '#' },
    { id: 9, image: '/images/video-testimonials-thumb/4.png', videoUrl: '#' },
    { id: 10, image: '/images/video-testimonials-thumb/5.png', videoUrl: '#' }
];

export default function VideoTestimonials() {
    return (
        <div className="relative w-full bg-black px-12 py-16 text-white select-none">
            <div className="max-w-7xl mx-auto relative group">

                <Swiper
                    modules={[Navigation, Autoplay]}
                    spaceBetween={16}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    loop={true}
                    centeredSlides={true}
                    slidesPerView={1.5}
                    centeredSlides={false}
                    navigation={{
                        prevEl: '.swiper-button-prev-custom',
                        nextEl: '.swiper-button-next-custom',
                    }}
                    breakpoints={{
                        // Mobile portrait
                        480: {
                            slidesPerView: 2,
                            spaceBetween: 16,
                        },
                        // Tablets
                        768: {
                            slidesPerView: 3,
                            spaceBetween: 16,
                        },
                        // Laptops
                        1024: {
                            slidesPerView: 4,
                            spaceBetween: 20,
                        },
                        // Desktop (Matches the 5-column layout in your image)
                        1280: {
                            slidesPerView: 5,
                            spaceBetween: 20,
                        },
                    }}
                    className="mySwiper"
                >
                    {SLIDES_DATA.map((slide) => (
                        <SwiperSlide key={slide.id}>
                            {/* Card Container */}
                            <div className="relative aspect-[3/4] w-full rounded-3xl overflow-hidden group/card cursor-pointer border border-neutral-900">

                                {/* Background Image */}
                                <img
                                    src={slide.image}
                                    alt={`Ambassador slide ${slide.id}`}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-105"
                                />

                                {/* Black Overlay gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                                {/* Centered Play Button */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center rounded-full border-2 border-white/80 bg-black/10 backdrop-blur-[2px] transition-all duration-300 group-hover/card:scale-110 group-hover/card:border-white group-hover/card:bg-white/20">
                                        <svg
                                            className="w-6 h-6 md:w-8 md:h-8 text-white fill-current translate-x-0.5"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M8 5v14l11-7z" />
                                        </svg>
                                    </div>
                                </div>

                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Custom Navigation - Left Button */}
                <button className="swiper-button-prev-custom absolute top-1/2 -left-10 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center text-white/70 hover:text-white transition-colors cursor-pointer">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                </button>

                {/* Custom Navigation - Right Button */}
                <button className="swiper-button-next-custom absolute top-1/2 -right-10 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center text-white/70 hover:text-white transition-colors cursor-pointer">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                </button>

            </div>
        </div>
    );
}