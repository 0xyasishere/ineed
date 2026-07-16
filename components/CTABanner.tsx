"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { SpeedLines, HalftoneOverlay } from "@/components/manga/Elements";
import { ArrowRightIcon } from "@/components/icons";

export function CTABanner() {
  const { t, locale } = useI18n();

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="relative overflow-hidden manga-panel bg-primary p-10 sm:p-14">
        <SpeedLines count={20} className="!opacity-40" />
        <HalftoneOverlay className="!opacity-[0.12] text-white" />

        <span className="absolute top-3 right-6 font-manga text-white/[0.12] text-7xl sm:text-8xl select-none pointer-events-none tracking-wider">GO!</span>
        <span className="absolute bottom-3 left-6 font-manga text-white/[0.08] text-5xl select-none pointer-events-none">NOW!</span>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] pointer-events-none opacity-10">
          <svg viewBox="0 0 400 400" className="w-full h-full text-white">
            {Array.from({ length: 24 }).map((_, i) => {
              const angle = (i * 15 * Math.PI) / 180;
              return (
                <line
                  key={i}
                  x1={200 + Math.cos(angle) * 30}
                  y1={200 + Math.sin(angle) * 30}
                  x2={200 + Math.cos(angle) * 190}
                  y2={200 + Math.sin(angle) * 190}
                  stroke="currentColor"
                  strokeWidth={i % 4 === 0 ? 3 : 1}
                />
              );
            })}
          </svg>
        </div>

        <div className="relative z-10 text-center">
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block font-manga text-sm tracking-widest text-white/80 mb-3"
          >
            ★ {locale === "id" ? "MULAI SEKARANG" : "GET STARTED"}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-manga text-3xl sm:text-4xl tracking-wide text-white"
            style={{ textShadow: "3px 3px 0 rgba(0,0,0,0.2)" }}
          >
            {t.cta.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-3 text-sm sm:text-base text-white/80 max-w-md mx-auto font-medium"
          >
            {t.cta.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <motion.a
              href="/auth/login"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 manga-outline-sm bg-white px-7 py-3.5 text-sm font-bold text-primary transition-all duration-200 hover:bg-white/90 cursor-pointer"
            >
              {t.cta.findFreelancer}
              <ArrowRightIcon size={16} />
            </motion.a>
            <motion.a
              href="/auth/login"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 manga-outline-sm bg-white/10 px-7 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/20 cursor-pointer"
            >
              {t.cta.startSelling}
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
