"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import type { CampaignSlide } from "@/types/service";
import { useI18n } from "@/lib/i18n";

export function CampaignBanner() {
  const [current, setCurrent] = useState(0);
  const { t } = useI18n();

  const slides: CampaignSlide[] = [
    {
      id: "1",
      title: t.campaign.slide1Title,
      subtitle: t.campaign.slide1Sub,
      accent: "bg-primary",
      icon: "⚔️",
    },
    {
      id: "2",
      title: t.campaign.slide2Title,
      subtitle: t.campaign.slide2Sub,
      accent: "bg-accent",
      icon: "🔥",
    },
    {
      id: "3",
      title: t.campaign.slide3Title,
      subtitle: t.campaign.slide3Sub,
      accent: "bg-secondary",
      icon: "💎",
    },
  ];

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
      <div className="relative overflow-hidden manga-panel bg-secondary p-8 sm:p-10">
        {/* Speed lines overlay */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="absolute h-px bg-white/10"
              style={{
                width: `${50 + Math.random() * 50}%`,
                top: `${8 + i * 8}%`,
                left: `${Math.random() * 30}%`,
                transform: `rotate(${-1 + Math.random() * 2}deg)`,
              }}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, x: 50, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -50, scale: 0.95 }}
            transition={{ duration: 0.4, type: "spring" }}
            className="relative z-10 max-w-xl"
          >
            <span className="inline-block text-4xl mb-3">{slide.icon}</span>
            <h2 className="text-xl sm:text-2xl font-manga tracking-wide text-white" style={{ textShadow: "2px 2px 0 rgba(0,0,0,0.3)" }}>
              {slide.title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-white/80 font-medium">
              {slide.subtitle}
            </p>
            <button className="mt-5 inline-flex items-center gap-2 manga-outline-sm bg-white/10 backdrop-blur-sm px-5 py-2.5 text-sm font-bold text-white transition-all duration-200 hover:bg-white/20 hover:shadow-[4px_4px_0_rgba(255,255,255,0.2)] cursor-pointer">
              {t.campaign.learnMore}
              <ArrowUpRight size={14} />
            </button>
          </motion.div>
        </AnimatePresence>

        <button
          onClick={prev}
          className="absolute left-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center manga-outline-sm bg-white/10 text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/20 cursor-pointer"
        >
          <ArrowLeft size={16} />
        </button>
        <button
          onClick={next}
          className="absolute right-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center manga-outline-sm bg-white/10 text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/20 cursor-pointer"
        >
          <ArrowRight size={16} />
        </button>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer border border-white/30 ${
                i === current ? "w-8 bg-white" : "w-2 bg-white/30"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
