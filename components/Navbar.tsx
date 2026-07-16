"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { MenuIcon, CloseIcon, GlobeIcon } from "@/components/icons";

const navLinks = [
  { href: "/#services", labelKey: "services" },
  { href: "/#jobs", labelKey: "jobs" },
  { href: "/#umkm", labelKey: "forEmployers" },
  { href: "/#trust", labelKey: "forFreelancers" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { t, locale, setLocale } = useI18n();

  return (
    <header className="sticky top-0 z-50 border-b-4 border-double border-foreground bg-background">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="/" className="flex items-center gap-1 group">
          <span
            className="font-manga text-2xl tracking-wide text-foreground group-hover:text-primary transition-colors"
            style={{ textShadow: "2px 2px 0 rgba(45,138,86,0.15)" }}
          >
            i<span className="text-primary">Need</span>
          </span>
          <span className="hidden sm:inline text-[10px] font-manga text-foreground/35 tracking-widest mt-1">
            {t.hero.badge}
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="manga-outline-sm px-3.5 py-2 text-xs font-bold text-foreground/70 hover:text-primary hover:bg-primary/5 transition-all duration-200"
            >
              {t.tabs[link.labelKey as keyof typeof t.tabs] || t.nav.services}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setLocale(locale === "id" ? "en" : "id")}
            className="manga-outline-sm flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-foreground/70 hover:text-primary hover:bg-primary/5 transition-all cursor-pointer"
          >
            <GlobeIcon size={14} />
            <span>{locale === "id" ? "EN" : "ID"}</span>
          </motion.button>

          <motion.a
            href="/auth/login"
            whileHover={{ scale: 1.05, y: -1 }}
            whileTap={{ scale: 0.95 }}
            className="hidden md:inline-flex manga-outline-sm bg-primary px-4 py-2 text-xs font-bold text-white transition-all hover:bg-primary/90"
          >
            ⚡ {t.nav.getStarted}
          </motion.a>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden manga-outline-sm p-2 text-foreground/70 hover:text-primary transition-colors cursor-pointer"
          >
            {mobileOpen ? <CloseIcon size={20} /> : <MenuIcon size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden border-t-2 border-dashed border-foreground/10 bg-background"
          >
            <nav className="flex flex-col p-4 gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="manga-outline-sm px-4 py-2.5 text-sm font-bold text-foreground/70 hover:text-primary hover:bg-primary/5 transition-all text-left"
                >
                  {t.tabs[link.labelKey as keyof typeof t.tabs] || t.nav.services}
                </a>
              ))}
              <a
                href="/auth/login"
                className="manga-outline-sm bg-primary px-4 py-2.5 text-sm font-bold text-white text-center mt-2"
              >
                ⚡ {t.nav.getStarted}
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
