"use client";

import { useI18n } from "@/lib/i18n";
import { Search, Bell, Globe } from "lucide-react";

export function TopNavbar() {
  const { t, locale, setLocale } = useI18n();

  return (
    <header className="flex h-16 items-center gap-4 border-b border-border bg-white px-6">
      <div className="flex-1 max-w-md">
        <div className="flex items-center gap-2 rounded-xl bg-muted px-4 py-2">
          <Search size={16} className="text-foreground/40" />
          <input
            type="text"
            placeholder={t.dashboard.searchPlaceholder}
            className="flex-1 bg-transparent text-sm text-foreground placeholder-foreground/40 outline-none"
          />
        </div>
      </div>

      <div className="ml-auto flex items-center gap-2">
        {/* Language Switcher */}
        <button
          onClick={() => setLocale(locale === "id" ? "en" : "id")}
          className="flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold text-foreground/60 transition-all duration-200 hover:bg-muted cursor-pointer"
        >
          <Globe size={14} />
          {locale === "id" ? "EN" : "ID"}
        </button>

        {/* Notifications */}
        <button className="relative rounded-xl p-2.5 text-foreground/60 transition-colors hover:bg-muted cursor-pointer">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-destructive" />
        </button>

        {/* Avatar */}
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary cursor-pointer">
          JD
        </div>
      </div>
    </header>
  );
}
