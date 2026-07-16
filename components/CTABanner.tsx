"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";

export function CTABanner() {
  const { t } = useI18n();

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 200 }}
        className="relative overflow-hidden manga-panel bg-foreground p-10 sm:p-14 text-center"
      >
        {/* Speed lines */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={i}
              className="absolute h-px bg-white/5"
              style={{
                width: `${40 + Math.random() * 60}%`,
                top: `${5 + i * 7}%`,
                left: `${Math.random() * 30}%`,
                transform: `rotate(${-2 + Math.random() * 4}deg)`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10">
          <motion.span
            animate={{ rotate: [0, -5, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-block text-5xl mb-4"
          >
            ⚡
          </motion.span>

          <h2 className="text-3xl sm:text-4xl font-manga tracking-wide text-white" style={{ textShadow: "3px 3px 0 rgba(0,0,0,0.3)" }}>
            {t.cta.title}
          </h2>
          <p className="mt-4 text-white/60 text-sm max-w-md mx-auto font-medium">
            {t.cta.subtitle}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <motion.a
              href="#"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="manga-outline-sm bg-primary px-8 py-3.5 text-sm font-bold text-white transition-all duration-200 hover:shadow-[4px_4px_0_rgba(255,255,255,0.2)] cursor-pointer"
            >
              {t.cta.findFreelancer} ⚡
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="manga-outline-sm bg-white/10 px-8 py-3.5 text-sm font-bold text-white transition-all duration-200 hover:bg-white/20 cursor-pointer"
            >
              {t.cta.startSelling} 🚀
            </motion.a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
