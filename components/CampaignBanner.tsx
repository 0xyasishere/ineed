"use client";

import { useState, useEffect, useCallback } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import type { CampaignSlide } from "@/types/service";

const slides: CampaignSlide[] = [
  {
    id: "1",
    title: "New: Verified Seller Program",
    subtitle:
      "Apply now to earn a verified badge and stand out to clients. Limited spots available.",
    accent: "bg-primary",
    icon: "✦",
  },
  {
    id: "2",
    title: "Spring Freelance Fest",
    subtitle:
      "Post a job this week and get 20% off your next service purchase. Ends Sunday.",
    accent: "bg-amber-500",
    icon: "⚡",
  },
  {
    id: "3",
    title: "Featured: Top AI & ML Experts",
    subtitle:
      "Browse our curated list of machine learning engineers and data scientists ready to hire.",
    accent: "bg-cyan-500",
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
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-12">
      <div className="relative overflow-hidden rounded-3xl bg-foreground p-8 sm:p-10 transition-all duration-500">
        <div className="relative z-10 max-w-xl">
          <span className="inline-block text-3xl mb-3">{slide.icon}</span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white">
            {slide.title}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-white/70">
            {slide.subtitle}
          </p>
          <button className="mt-5 inline-flex items-center gap-2 rounded-xl bg-white/10 backdrop-blur-sm px-5 py-2.5 text-sm font-bold text-white transition-all duration-200 hover:bg-white/20 cursor-pointer">
            Learn More
            <ArrowUpRight size={14} />
          </button>
        </div>

        <button
          onClick={prev}
          className="absolute left-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/20 cursor-pointer"
        >
          <ArrowLeft size={16} />
        </button>
        <button
          onClick={next}
          className="absolute right-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/20 cursor-pointer"
        >
          <ArrowRight size={16} />
        </button>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                i === current ? "w-6 bg-white" : "w-1.5 bg-white/30"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
