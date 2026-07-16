"use client";

import { useState, useEffect, useCallback } from "react";
import type { CampaignSlide } from "@/types/service";

const slides: CampaignSlide[] = [
  {
    id: "1",
    title: "🎉 New: Verified Seller Program",
    subtitle:
      "Apply now to earn a verified badge and stand out to clients. Limited spots available.",
    accent: "from-violet-500 to-purple-600",
    icon: "✦",
  },
  {
    id: "2",
    title: "🔥 Spring Freelance Fest",
    subtitle:
      "Post a job this week and get 20% off your next service purchase. Ends Sunday.",
    accent: "from-amber-500 to-orange-600",
    icon: "⚡",
  },
  {
    id: "3",
    title: "🚀 Featured: Top AI & ML Experts",
    subtitle:
      "Browse our curated list of machine learning engineers and data scientists ready to hire.",
    accent: "from-cyan-500 to-blue-600",
    icon: "◆",
  },
];

export function CampaignBanner() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const slide = slides[current];

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-8">
      <div
        className={`relative overflow-hidden rounded-2xl bg-gradient-to-r ${slide.accent} p-8 sm:p-10 transition-all duration-500`}
      >
        <div className="relative z-10 max-w-xl">
          <h2 className="text-xl sm:text-2xl font-bold text-white">{slide.title}</h2>
          <p className="mt-2 text-sm leading-relaxed text-white/80">{slide.subtitle}</p>
          <button className="mt-5 inline-flex items-center gap-2 rounded-xl bg-white/20 backdrop-blur-sm px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/30">
            Learn More
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </button>
        </div>

        <div className="absolute right-8 top-1/2 -translate-y-1/2 text-[120px] leading-none opacity-10 select-none pointer-events-none">
          {slide.icon}
        </div>

        <button
          onClick={prev}
          className="absolute left-3 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-colors hover:bg-white/30"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
        <button
          onClick={next}
          className="absolute right-3 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-colors hover:bg-white/30"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === current ? "w-6 bg-white" : "w-1.5 bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
