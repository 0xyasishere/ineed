"use client";

import { useI18n } from "@/lib/i18n";
import Link from "next/link";

export function Footer() {
  const { t, locale } = useI18n();

  return (
    <footer className="border-t-4 border-double border-foreground bg-muted">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <span
              className="font-manga text-2xl tracking-wide text-foreground"
              style={{ textShadow: "2px 2px 0 rgba(45,138,86,0.15)" }}
            >
              i<span className="text-primary">Need</span>
            </span>
            <p className="mt-3 text-xs text-foreground/55 leading-relaxed font-medium max-w-[220px]">
              {locale === "id"
                ? "Marketplace freelance terpercaya untuk menemukan bakat dan peluang."
                : "Trusted freelance marketplace to find talent and opportunities."}
            </p>
          </div>

          <div>
            <h4 className="font-manga tracking-wide text-sm" style={{ textShadow: "1px 1px 0 rgba(45,138,86,0.1)" }}>
              Platform
            </h4>
            <ul className="mt-3 space-y-2">
              {(locale === "id"
                ? [
                    { label: "Jelajahi Layanan", href: "/#services" },
                    { label: "Cari Talenta", href: "/#services" },
                    { label: "Posting Pekerjaan", href: "/auth/register" },
                    { label: "Cara Kerja", href: "/#services" },
                  ]
                : [
                    { label: "Browse Services", href: "/#services" },
                    { label: "Find Talent", href: "/#services" },
                    { label: "Post a Job", href: "/auth/register" },
                    { label: "How It Works", href: "/#services" },
                  ]
              ).map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-xs text-foreground/55 hover:text-primary font-medium transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-manga tracking-wide text-sm" style={{ textShadow: "1px 1px 0 rgba(45,138,86,0.1)" }}>
              {locale === "id" ? "Perusahaan" : "Company"}
            </h4>
            <ul className="mt-3 space-y-2">
              {(locale === "id"
                ? [
                    { label: "Tentang Kami", href: "/#services" },
                    { label: "Blog", href: "/#services" },
                    { label: "Karir", href: "/#services" },
                    { label: "Pers", href: "/#services" },
                  ]
                : [
                    { label: "About Us", href: "/#services" },
                    { label: "Blog", href: "/#services" },
                    { label: "Careers", href: "/#services" },
                    { label: "Press", href: "/#services" },
                  ]
              ).map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-xs text-foreground/55 hover:text-primary font-medium transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-manga tracking-wide text-sm" style={{ textShadow: "1px 1px 0 rgba(45,138,86,0.1)" }}>
              {locale === "id" ? "Dukungan" : "Support"}
            </h4>
            <ul className="mt-3 space-y-2">
              {(locale === "id"
                ? [
                    { label: "Pusat Bantuan", href: "/#services" },
                    { label: "Keamanan", href: "/#services" },
                    { label: t.footer.terms, href: "/#services" },
                    { label: t.footer.privacy, href: "/#services" },
                  ]
                : [
                    { label: "Help Center", href: "/#services" },
                    { label: "Safety", href: "/#services" },
                    { label: t.footer.terms, href: "/#services" },
                    { label: t.footer.privacy, href: "/#services" },
                  ]
              ).map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-xs text-foreground/55 hover:text-primary font-medium transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t-4 border-double border-foreground/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[10px] text-foreground/40 font-bold">
            © 2026 iNeed. All rights reserved.
          </p>
          <p className="text-[10px] text-foreground/40 font-bold font-manga tracking-wider">
            Built with 💚 and ☕
          </p>
        </div>
      </div>
    </footer>
  );
}
