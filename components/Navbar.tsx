"use client";

import { useState } from "react";
import Link from "next/link";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Jobs", href: "#jobs" },
  { label: "Dashboard", href: "#" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-10">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-900">
                <span className="text-sm font-bold text-white">F</span>
              </div>
              <span className="text-lg font-bold tracking-tight text-gray-900">
                FreelanceHub
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="rounded-lg px-3.5 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <a
              href="#"
              className="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
            >
              Log In
            </a>
            <a
              href="#"
              className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800"
            >
              Get Started
            </a>
          </div>

          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center rounded-lg p-2 text-gray-600 hover:bg-gray-100"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          <div className="space-y-1 px-4 pt-3 pb-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="block rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="mt-3 flex flex-col gap-2 border-t border-gray-100 pt-3">
              <a href="#" className="rounded-lg px-3 py-2.5 text-center text-sm font-medium text-gray-700 hover:bg-gray-50">
                Log In
              </a>
              <a href="#" className="rounded-lg bg-gray-900 px-3 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-800">
                Get Started
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
