import React from 'react';

const PROCESS_STEPS = [
  {
    step: '01',
    title: 'RESEARCH',
    description: 'Every ingredient is selected with performance in mind.'
  },
  {
    step: '02',
    title: 'FORMULATION',
    description: 'Balanced to support energy, focus, and endurance.'
  },
  {
    step: '03',
    title: 'QUALITY TESTING',
    description: 'Each batch undergoes quality checks for consistency.'
  },
  {
    step: '04',
    title: 'PEAK PERFORMANCE',
    description: 'Delivered to help you get the most from every workout.'
  }
];

export default function FromLabToShaker() {
  return (
    <>
    <section className="py-20">
      <div className="container">
        {/* Main Header */}
        <h2 className="h2-airborne text-center mb-5">
          FROM LAB TO YOUR SHAKER CUP
        </h2>

        {/* Timeline Container */}
        <div className="relative">
          {/* Horizontal Connecting Line (Desktop / Tablet) */}
          <div className="hidden md:block absolute top-6 left-[12%] right-[12%] h-[1px] bg-red-950/80 z-0">
            <div className="w-full h-full bg-gradient-to-r from-red-900/40 via-red-600/80 to-red-900/40" />
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-4 relative z-10">
            {PROCESS_STEPS.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center group cursor-pointer"
              >
                {/* Number Circle Badge */}
                <div className="w-12 h-12 rounded-full border border-[#[#9F272A]] bg-black text-[#9F272A] font-mono text-sm md:text-base font-semibold flex items-center justify-center mb-6 relative z-10 transition-all duration-300 group-hover:scale-110 group-hover:bg-[#[#9F272A]] group-hover:text-white group-hover:border-red-500 group-hover:shadow-[0_0_20px_rgba(239,68,68,0.7)]">
                  {item.step}
                </div>

                {/* Step Title */}
                <h4 className="h4-dine">
                  {item.title}
                </h4>

                {/* Step Description */}
                <p>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
    </>
  );
}
