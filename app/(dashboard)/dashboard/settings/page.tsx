"use client";

import { useI18n } from "@/lib/i18n";
import { useAuth } from "@/lib/auth";
import { createClient } from "@/lib/supabase/client";
import { GlobeIcon, BellIcon, ShieldIcon } from "@/components/icons";
import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";

export default function SettingsPage() {
  const { t, locale, setLocale } = useI18n();
  const { user } = useAuth();
  const supabase = createClient();
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    proposals: true,
    payments: true,
  });

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
    toast.success("Setting updated");
  };

  const handlePasswordChange = async () => {
    if (!user?.email) return;
    const { error } = await supabase.auth.resetPasswordForEmail(user.email, {
      redirectTo: `${window.location.origin}/auth/callback`,
    });
    if (error) {
      toast.error("Failed to send reset email");
    } else {
      toast.success("Password reset email sent!");
    }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <h1 className="text-2xl font-manga text-foreground">⚙️ {t.dashboard.settingsTitle}</h1>
        <p className="mt-1 text-sm text-foreground/50">{t.dashboard.settingsDesc}</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.05 }} className="manga-panel bg-white p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10"><GlobeIcon size={20} className="text-primary" /></div>
          <div>
            <h3 className="text-sm font-bold text-foreground">🌐 {t.dashboard.language}</h3>
            <p className="text-xs text-foreground/50">Pilih bahasa tampilan</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setLocale("id")} className={`manga-outline-sm px-5 py-2.5 text-sm font-bold transition-all cursor-pointer ${locale === "id" ? "bg-primary text-white" : "bg-muted text-foreground/60 hover:bg-muted/80"}`}>🇮🇩 Indonesia</button>
          <button onClick={() => setLocale("en")} className={`manga-outline-sm px-5 py-2.5 text-sm font-bold transition-all cursor-pointer ${locale === "en" ? "bg-primary text-white" : "bg-muted text-foreground/60 hover:bg-muted/80"}`}>🇬🇧 English</button>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.1 }} className="manga-panel bg-white p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100"><BellIcon size={20} className="text-amber-600" /></div>
          <div>
            <h3 className="text-sm font-bold text-foreground">🔔 {t.dashboard.notifications}</h3>
            <p className="text-xs text-foreground/50">Kelola notifikasi yang kamu terima</p>
          </div>
        </div>
        <div className="space-y-3">
          {([
            { key: "email" as const, label: "Email notifications" },
            { key: "push" as const, label: "Push notifications" },
            { key: "proposals" as const, label: "New proposal alerts" },
            { key: "payments" as const, label: "Payment updates" },
          ]).map((item) => (
            <label key={item.key} className="flex items-center justify-between py-2 cursor-pointer">
              <span className="text-sm text-foreground/70">{item.label}</span>
              <div
                onClick={() => toggleNotification(item.key)}
                className={`relative inline-flex h-6 w-11 cursor-pointer rounded-full transition-colors ${notifications[item.key] ? "bg-primary" : "bg-foreground/20"}`}
              >
                <span className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${notifications[item.key] ? "translate-x-5" : ""}`} />
              </div>
            </label>
          ))}
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.15 }} className="manga-panel bg-white p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100"><ShieldIcon size={20} className="text-emerald-600" /></div>
          <div>
            <h3 className="text-sm font-bold text-foreground">🔒 Security</h3>
            <p className="text-xs text-foreground/50">Kelola keamanan akun</p>
          </div>
        </div>
        <div className="space-y-3">
          <button onClick={handlePasswordChange} className="w-full manga-outline bg-muted/50 px-4 py-2.5 text-left text-sm font-semibold text-foreground/70 transition-colors hover:bg-muted cursor-pointer">
            Change Password
          </button>
          <button onClick={() => toast.info("2FA coming soon!")} className="w-full manga-outline bg-muted/50 px-4 py-2.5 text-left text-sm font-semibold text-foreground/70 transition-colors hover:bg-muted cursor-pointer">
            Two-Factor Authentication
          </button>
        </div>
      </motion.div>
    </div>
  );
}
