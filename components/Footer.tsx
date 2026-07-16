"use client";

import Image from "next/image";
import { useI18n } from "@/lib/i18n";

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="border-t-[3px] border-foreground bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2.5">
            <Image
              src="/images/ineed-logo.jpg"
              alt="ineed"
              width={28}
              height={28}
              className="h-7 w-7 rounded-lg object-cover manga-outline-sm"
            />
            <span className="text-sm font-manga tracking-wider text-foreground">
              ineed
            </span>
          </div>
          <div className="flex items-center gap-6 text-xs font-bold text-foreground/40">
            <a href="#" className="hover:text-primary transition-colors cursor-pointer">
              {t.footer.terms}
            </a>
            <a href="#" className="hover:text-primary transition-colors cursor-pointer">
              {t.footer.privacy}
            </a>
            <a href="#" className="hover:text-primary transition-colors cursor-pointer">
              {t.footer.help}
            </a>
            <span>© 2026 ineed</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
