"use client";

import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { SpeedLines, FloatingEmoji } from "@/components/manga/Elements";
import { useI18n } from "@/lib/i18n";

const popularSearches = ["Web Design", "React Dev", "UI/UX", "Copywriting"];

export function HeroSection() {
  const { t } = useI18n();

  return (
    <section className="relative overflow-hidden bg-background speed-lines">
      <SpeedLines />
      <FloatingEmoji emoji="⚡" className="top-20 right-[15%] text-4xl" delay={0} />
      <FloatingEmoji emoji="🔥" className="top-32 left-[10%] text-3xl" delay={1} />
      <FloatingEmoji emoji="✨" className="bottom-20 right-[25%] text-3xl" delay={2} />
      <FloatingEmoji emoji="💪" className="top-40 right-[8%] text-2xl" delay={0.5} />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-14 sm:pt-28 sm:pb-20">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="inline-flex items-center gap-2 manga-outline-sm bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary mb-6"
          >
            <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
            {t.hero.badge}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, type: "spring" }}
            className="text-5xl sm:text-6xl lg:text-7xl font-manga tracking-wide text-foreground leading-[1.1]"
            style={{ textShadow: "4px 4px 0 var(--color-secondary)" }}
          >
            <span className="text-primary">{t.hero.title1}</span>
            <br />
            <span className="text-secondary">{t.hero.titleHighlight}</span>{" "}
            {t.hero.title2}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-6 text-lg sm:text-xl leading-relaxed text-foreground/60 max-w-lg font-medium"
          >
            {t.hero.subtitle}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4, type: "spring" }}
          className="mt-10 max-w-2xl"
        >
          <div className="flex items-center gap-2 manga-outline bg-white p-2 pl-5 transition-all duration-300 focus-within:border-primary focus-within:shadow-[6px_6px_0_var(--color-primary)]">
            <Search size={20} className="shrink-0 text-foreground/55" />
            <input
              type="text"
              placeholder={t.hero.searchPlaceholder}
              className="flex-1 bg-transparent py-3.5 text-sm font-medium text-foreground placeholder-foreground/40 outline-none"
            />
            <button className="shrink-0 manga-outline-sm bg-primary px-7 py-3.5 text-sm font-bold text-white transition-all duration-200 hover:bg-primary/90 hover:shadow-[4px_4px_0_var(--color-primary)] cursor-pointer">
              ⚡ {t.hero.search || "Search"}
            </button>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-foreground/55 font-bold">
            <span>{t.hero.popular}</span>
            {popularSearches.map((tag) => (
              <a
                key={tag}
                href="#"
                className="manga-outline-sm bg-muted px-3.5 py-1.5 text-foreground/60 transition-all duration-200 hover:bg-primary/10 hover:text-primary cursor-pointer text-xs"
              >
                {tag}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
