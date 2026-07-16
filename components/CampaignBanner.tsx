"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { CampaignSlide } from "@/types/service";
import { useI18n } from "@/lib/i18n";
import { SpeedLines, HalftoneOverlay } from "@/components/manga/Elements";
import { ArrowLeftIcon, ArrowRightIcon, ExternalLinkIcon } from "@/components/icons";

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
  }, [slides.length]);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const slide = slides[current];

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-12">
      <div className="relative overflow-hidden manga-panel bg-secondary p-8 sm:p-10">
        <SpeedLines count={15} />
        <HalftoneOverlay className="!opacity-[0.08]" />

        <span className="absolute top-4 right-6 font-manga text-white/10 text-6xl sm:text-7xl select-none pointer-events-none">BOOM</span>

        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, x: 50, scale: 0.95, rotate: 1 }}
            animate={{ opacity: 1, x: 0, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, x: -50, scale: 0.95, rotate: -1 }}
            transition={{ duration: 0.4, type: "spring" }}
            className="relative z-10 max-w-xl"
          >
            <motion.span
              className="inline-block text-5xl mb-3"
              animate={{ rotate: [0, -10, 10, 0], scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
            >
              {slide.icon}
            </motion.span>
            <h2 className="text-xl sm:text-2xl font-manga tracking-wide text-white" style={{ textShadow: "2px 2px 0 rgba(0,0,0,0.3)" }}>
              {slide.title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-white/80 font-medium">
              {slide.subtitle}
            </p>
            <motion.button
              whileHover={{ scale: 1.05, x: 4 }}
              whileTap={{ scale: 0.95 }}
              className="mt-5 inline-flex items-center gap-2 manga-outline-sm bg-white/10 backdrop-blur-sm px-5 py-2.5 text-sm font-bold text-white transition-all duration-200 hover:bg-white/20 cursor-pointer"
            >
              {t.campaign.learnMore}
              <ExternalLinkIcon size={14} />
            </motion.button>
          </motion.div>
        </AnimatePresence>

        <motion.button
          onClick={prev}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="absolute left-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center manga-outline-sm bg-white/10 text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/20 cursor-pointer z-20"
        >
          <ArrowLeftIcon size={16} />
        </motion.button>
        <motion.button
          onClick={next}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="absolute right-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center manga-outline-sm bg-white/10 text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/20 cursor-pointer z-20"
        >
          <ArrowRightIcon size={16} />
        </motion.button>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
          {slides.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => setCurrent(i)}
              whileHover={{ scale: 1.2 }}
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
