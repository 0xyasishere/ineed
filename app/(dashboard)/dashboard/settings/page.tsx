"use client";

import { useI18n } from "@/lib/i18n";
import { Globe, Bell, Shield, Palette } from "lucide-react";

export default function SettingsPage() {
  const { t, locale, setLocale } = useI18n();

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-extrabold text-foreground">{t.dashboard.settingsTitle}</h1>
        <p className="mt-1 text-sm text-foreground/50">{t.dashboard.settingsDesc}</p>
      </div>

      {/* Language */}
      <div className="rounded-2xl bg-white border border-border p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
            <Globe size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-foreground">{t.dashboard.language}</h3>
            <p className="text-xs text-foreground/50">Pilih bahasa tampilan</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setLocale("id")}
            className={`rounded-xl px-5 py-2.5 text-sm font-bold transition-all cursor-pointer ${
              locale === "id" ? "bg-primary text-white" : "bg-muted text-foreground/60 hover:bg-muted/80"
            }`}
          >
            🇮🇩 Indonesia
          </button>
          <button
            onClick={() => setLocale("en")}
            className={`rounded-xl px-5 py-2.5 text-sm font-bold transition-all cursor-pointer ${
              locale === "en" ? "bg-primary text-white" : "bg-muted text-foreground/60 hover:bg-muted/80"
            }`}
          >
            🇬🇧 English
          </button>
        </div>
      </div>

      {/* Notifications */}
      <div className="rounded-2xl bg-white border border-border p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100">
            <Bell size={20} className="text-amber-600" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-foreground">{t.dashboard.notifications}</h3>
            <p className="text-xs text-foreground/50">Kelola notifikasi yang kamu terima</p>
          </div>
        </div>
        <div className="space-y-3">
          {["Email notifications", "Push notifications", "New proposal alerts", "Payment updates"].map((item) => (
            <label key={item} className="flex items-center justify-between py-2">
              <span className="text-sm text-foreground/70">{item}</span>
              <div className="relative inline-flex h-6 w-11 cursor-pointer rounded-full bg-primary transition-colors">
                <span className="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform translate-x-5" />
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Security */}
      <div className="rounded-2xl bg-white border border-border p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100">
            <Shield size={20} className="text-emerald-600" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-foreground">Security</h3>
            <p className="text-xs text-foreground/50">Kelola keamanan akun</p>
          </div>
        </div>
        <div className="space-y-3">
          <button className="w-full rounded-xl border border-border bg-muted/50 px-4 py-2.5 text-left text-sm font-semibold text-foreground/70 transition-colors hover:bg-muted cursor-pointer">
            Change Password
          </button>
          <button className="w-full rounded-xl border border-border bg-muted/50 px-4 py-2.5 text-left text-sm font-semibold text-foreground/70 transition-colors hover:bg-muted cursor-pointer">
            Two-Factor Authentication
          </button>
        </div>
      </div>
    </div>
  );
}
