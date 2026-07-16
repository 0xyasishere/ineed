"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { SpeedLines, FloatingEmoji, SFXText, Starburst, HalftoneOverlay } from "@/components/manga/Elements";
import { SearchIcon, ZapIcon } from "@/components/icons";

const popularSearches = ["Web Design", "React Dev", "UI/UX", "Copywriting"];

export function HeroSection() {
  const { t } = useI18n();

  return (
    <section className="relative overflow-hidden bg-background speed-lines">
      <SpeedLines count={30} />
      <HalftoneOverlay />

      <SFXText text="DOJO" className="top-16 right-[10%] !text-6xl sm:!text-7xl !opacity-[0.06] text-primary" />
      <SFXText text="POWER" className="bottom-24 left-[5%] !text-5xl !opacity-[0.05] text-secondary" />
      <SFXText text="SKILL" className="top-40 left-[15%] !text-4xl !opacity-[0.04] text-accent" />

      <Starburst className="top-10 right-[20%] text-primary" size={150} />
      <Starburst className="bottom-10 left-[10%] text-accent" size={100} />

      <FloatingEmoji emoji="⚡" className="top-20 right-[15%] text-5xl" delay={0} />
      <FloatingEmoji emoji="🔥" className="top-32 left-[8%] text-4xl" delay={1} />
      <FloatingEmoji emoji="✨" className="bottom-20 right-[25%] text-4xl" delay={2} />
      <FloatingEmoji emoji="💪" className="top-40 right-[6%] text-3xl" delay={0.5} />
      <FloatingEmoji emoji="🎯" className="bottom-32 left-[20%] text-3xl" delay={1.5} />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-14 sm:pt-28 sm:pb-20">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, x: -30, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="inline-flex items-center gap-2 manga-outline-sm bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary mb-6"
          >
            <motion.span
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="h-2 w-2 rounded-full bg-primary"
            />
            {t.hero.badge}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, type: "spring" }}
            className="text-5xl sm:text-6xl lg:text-7xl font-manga tracking-wide leading-[1.1]"
          >
            <motion.span
              className="text-primary block"
              style={{ textShadow: "3px 3px 0 rgba(45,138,86,0.2)" }}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
            >
              {t.hero.title1}
            </motion.span>
            <motion.span
              className="text-secondary block"
              style={{ textShadow: "3px 3px 0 rgba(15,36,48,0.15)" }}
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 150 }}
            >
              {t.hero.titleHighlight}
            </motion.span>
            <motion.span
              className="text-foreground block"
              style={{ textShadow: "3px 3px 0 rgba(45,138,86,0.15)" }}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6, type: "spring", stiffness: 150 }}
            >
              {t.hero.title2}
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mt-6 text-lg sm:text-xl leading-relaxed text-foreground/65 max-w-lg font-medium"
          >
            {t.hero.subtitle}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9, type: "spring" }}
          className="mt-10 max-w-2xl"
        >
          <div className="flex items-center gap-2 manga-outline bg-white p-2 pl-5 transition-all duration-300 focus-within:border-primary focus-within:shadow-[6px_6px_0_var(--color-primary)]">
            <SearchIcon size={20} className="shrink-0 text-foreground/55" />
            <input
              type="text"
              placeholder={t.hero.searchPlaceholder}
              className="flex-1 bg-transparent py-3.5 text-sm font-medium text-foreground placeholder-foreground/40 outline-none"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="shrink-0 manga-outline-sm bg-primary px-7 py-3.5 text-sm font-bold text-white transition-all duration-200 hover:bg-primary/90 cursor-pointer flex items-center gap-1.5"
            >
              <ZapIcon size={14} />
              {t.hero.search}
            </motion.button>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-foreground/55 font-bold">
            <span>{t.hero.popular}</span>
            {popularSearches.map((tag) => (
              <motion.a
                key={tag}
                href="#"
                whileHover={{ scale: 1.05, y: -1 }}
                className="manga-outline-sm bg-muted px-3.5 py-1.5 text-foreground/65 transition-all duration-200 hover:bg-primary/10 hover:text-primary cursor-pointer text-xs"
              >
                {tag}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
