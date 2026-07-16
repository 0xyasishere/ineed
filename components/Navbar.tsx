"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { List, X, Sword } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { t, locale, setLocale } = useI18n();

  const navLinks = [
    { label: t.nav.services, href: "#services" },
    { label: t.nav.jobs, href: "#jobs" },
    { label: t.nav.dashboard, href: "#" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b-[3px] border-foreground">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2.5 cursor-pointer group">
              <Image
                src="/images/ineed-logo.jpg"
                alt="ineed"
                width={36}
                height={36}
                className="h-9 w-9 rounded-lg object-cover manga-outline-sm"
                priority
              />
              <span className="text-xl font-manga tracking-wider text-foreground group-hover:text-primary transition-colors">
                ineed
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="rounded-lg px-4 py-2 text-sm font-bold text-foreground/70 transition-colors duration-200 hover:bg-primary/10 hover:text-primary border-2 border-transparent hover:border-foreground/20 cursor-pointer"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => setLocale(locale === "id" ? "en" : "id")}
              className="flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-bold text-foreground border-2 border-foreground/30 transition-all hover:bg-foreground hover:text-white cursor-pointer"
            >
              {locale === "id" ? (
                <>🇬🇧 English</>
              ) : (
                <>🇮🇩 Indonesia</>
              )}
            </button>

            <a
              href="#"
              className="rounded-lg px-4 py-2.5 text-sm font-bold text-foreground/70 transition-colors hover:bg-muted cursor-pointer border-2 border-foreground/20"
            >
              {t.nav.login}
            </a>
            <a
              href="#"
              className="manga-outline-sm bg-primary px-5 py-2.5 text-sm font-bold text-white transition-all duration-200 hover:bg-primary/90 hover:shadow-[4px_4px_0_var(--color-foreground)] cursor-pointer"
            >
              {t.nav.getStarted} ⚡
            </a>
          </div>

          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center rounded-lg p-2 text-foreground/70 border-2 border-foreground/20 transition-colors hover:bg-muted cursor-pointer"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={20} /> : <List size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t-[3px] border-foreground bg-white overflow-hidden"
          >
            <div className="space-y-1 px-4 pt-3 pb-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="block rounded-lg px-4 py-3 text-sm font-bold text-foreground/70 transition-colors hover:bg-primary/10 hover:text-primary border-2 border-transparent hover:border-foreground/10 cursor-pointer"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <div className="mt-3 flex flex-col gap-2 border-t-[3px] border-foreground/20 pt-3">
                <button
                  onClick={() => { setLocale(locale === "id" ? "en" : "id"); setMobileOpen(false); }}
                  className="rounded-lg px-4 py-3 text-center text-sm font-bold text-foreground border-2 border-foreground/30 hover:bg-foreground hover:text-white cursor-pointer"
                >
                  {locale === "id" ? "🇬🇧 English" : "🇮🇩 Indonesia"}
                </button>
                <a href="#" className="rounded-lg px-4 py-3 text-center text-sm font-bold text-foreground/70 hover:bg-muted border-2 border-foreground/20 cursor-pointer">
                  {t.nav.login}
                </a>
                <a href="#" className="rounded-lg bg-primary px-4 py-3 text-center text-sm font-bold text-white border-2 border-foreground hover:bg-primary/90 cursor-pointer">
                  {t.nav.getStarted} ⚡
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
