"use client";

import { useI18n } from "@/lib/i18n";

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
                ? ["Jelajahi Layanan", "Cari Talenta", "Posting Pekerjaan", "Cara Kerja"]
                : ["Browse Services", "Find Talent", "Post a Job", "How It Works"]
              ).map((link) => (
                <li key={link}>
                  <a href="#" className="text-xs text-foreground/55 hover:text-primary font-medium transition-colors">{link}</a>
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
                ? ["Tentang Kami", "Blog", "Karir", "Pers"]
                : ["About Us", "Blog", "Careers", "Press"]
              ).map((link) => (
                <li key={link}>
                  <a href="#" className="text-xs text-foreground/55 hover:text-primary font-medium transition-colors">{link}</a>
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
                ? ["Pusat Bantuan", "Keamanan", t.footer.terms, t.footer.privacy]
                : ["Help Center", "Safety", t.footer.terms, t.footer.privacy]
              ).map((link) => (
                <li key={link}>
                  <a href="#" className="text-xs text-foreground/55 hover:text-primary font-medium transition-colors">{link}</a>
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
