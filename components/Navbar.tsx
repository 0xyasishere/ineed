"use client";

import { useState } from "react";
import Link from "next/link";
import { List, X } from "lucide-react";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Jobs", href: "#jobs" },
  { label: "Dashboard", href: "#" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-10">
            <Link href="/" className="flex items-center gap-2.5 cursor-pointer">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary">
                <span className="text-sm font-extrabold text-on-primary">F</span>
              </div>
              <span className="text-lg font-extrabold tracking-tight text-foreground">
                ineed
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="rounded-xl px-4 py-2 text-sm font-semibold text-foreground/70 transition-colors duration-200 hover:bg-muted hover:text-primary cursor-pointer"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <a
              href="#"
              className="rounded-xl px-4 py-2.5 text-sm font-semibold text-foreground/70 transition-colors duration-200 hover:bg-muted cursor-pointer"
            >
              Log In
            </a>
            <a
              href="#"
              className="rounded-xl bg-accent px-5 py-2.5 text-sm font-bold text-white transition-all duration-200 hover:bg-accent/90 hover:shadow-lg hover:shadow-accent/25 cursor-pointer"
            >
              Get Started
            </a>
          </div>

          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center rounded-xl p-2 text-foreground/70 transition-colors hover:bg-muted cursor-pointer"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={20} /> : <List size={20} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-white">
          <div className="space-y-1 px-4 pt-3 pb-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="block rounded-xl px-4 py-3 text-sm font-semibold text-foreground/70 transition-colors hover:bg-muted hover:text-primary cursor-pointer"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="mt-3 flex flex-col gap-2 border-t border-border pt-3">
              <a href="#" className="rounded-xl px-4 py-3 text-center text-sm font-semibold text-foreground/70 hover:bg-muted cursor-pointer">
                Log In
              </a>
              <a href="#" className="rounded-xl bg-accent px-4 py-3 text-center text-sm font-bold text-white hover:bg-accent/90 cursor-pointer">
                Get Started
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
