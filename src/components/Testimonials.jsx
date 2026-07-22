import React from 'react';

const TESTIMONIALS_DATA = [
  {
    id: 1,
    quote: "Being an ambassador transformed how I connect with my community. The tools and support are unmatched.",
    name: "Priya Nair",
    location: "Mumbai, India",
    since: "2022",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    metric: "43K",
    metricLabel: "community"
  },
  {
    id: 2,
    quote: "I went from a curious member to leading a 250-person local chapter. The growth is real.",
    name: "Marcus Webb",
    location: "Lagos, Nigeria",
    since: "2021",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    metric: "15K",
    metricLabel: "community"
  },
  {
    id: 3,
    quote: "The ambassador network gave me a global platform to share ideas I care about deeply.",
    name: "Elena Vess",
    location: "Berlin, Germany",
    since: "2023",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80",
    metric: "29K",
    metricLabel: "community"
  },
  {
    id: 4,
    quote: "The ambassador network gave me a global platform to share ideas I care about deeply.",
    name: "Elena Vess",
    location: "Berlin, Germany",
    since: "2023",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80",
    metric: "29K",
    metricLabel: "community"
  }
];

export default function Testimonials() {
  return (
    <section className="w-full bg-black pb-20 px-4 md:px-8 text-white select-none">
      <div className="max-w-7xl mx-auto">
        {/* Main Section Heading */}
        <h2 className="h2-dine mb-10 text-center">
          Testimonials
        </h2>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {TESTIMONIALS_DATA.map((item) => (
            <div
              key={item.id}
              className="bg-[#0b0b0e] border border-neutral-800/80 rounded-2xl p-6 flex flex-col justify-between h-full transition-all duration-300 hover:border-neutral-700 hover:bg-[#101014] hover:-translate-y-1 group"
            >
              {/* Top Quote Content */}
              <div className="mb-8">
                <p className="text-neutral-300 italic text-sm md:text-[14.5px] leading-relaxed font-sans font-light">
                  “{item.quote}”
                </p>
              </div>

              {/* Bottom Card Footer */}
              <div className="flex items-end justify-between pt-2">
                {/* User Info */}
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-10 h-10 rounded-full object-cover border border-neutral-700/60 shrink-0"
                  />
                  <div className="min-w-0">
                    <h4 className="text-white font-semibold text-xs md:text-sm leading-tight truncate">
                      {item.name}
                    </h4>
                    <p className="text-neutral-400 text-[11px] leading-tight mt-0.5 truncate !font-sans">
                      {item.location} · since {item.since}
                    </p>
                  </div>
                </div>

                {/* Community Metric */}
                <div className="text-right shrink-0 ml-2">
                  <span className="text-[#e63b38] font-bold text-base md:text-lg leading-none block">
                    {item.metric}
                  </span>
                  <span className="text-neutral-400 text-[10px] leading-tight block mt-0.5 font-sans lowercase">
                    {item.metricLabel}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
