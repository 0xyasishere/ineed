"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import {
  LayoutDashboard,
  FileText,
  Send,
  Wallet,
  CheckCircle2,
  Plus,
} from "lucide-react";

const stats = [
  { key: "activeListings", value: "12", icon: FileText, color: "text-primary", bg: "bg-primary/10" },
  { key: "pendingProposals", value: "5", icon: Send, color: "text-accent", bg: "bg-accent/10" },
  { key: "totalEarnings", value: "$4,280", icon: Wallet, color: "text-gold", bg: "bg-gold/10" },
  { key: "completedJobs", value: "28", icon: CheckCircle2, color: "text-secondary", bg: "bg-secondary/10" },
];

const recentListings = [
  { id: "1", title: "Landing Page SaaS Modern", category: "Web Development", price: "$299", status: "active", emoji: "🌐" },
  { id: "2", title: "Brand Identity Startup", category: "Branding", price: "$199", status: "active", emoji: "🎨" },
  { id: "3", title: "Mobile App UI/UX Design", category: "UI/UX Design", price: "$450", status: "pending", emoji: "📱" },
  { id: "4", title: "SEO Content Writing Pack", category: "Copywriting", price: "$89", status: "active", emoji: "✍️" },
];

export default function DashboardOverview() {
  const { t } = useI18n();

  return (
    <div className="space-y-6">
      {/* Welcome header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="manga-panel bg-gradient-to-r from-primary via-primary/90 to-accent p-6 sm:p-8"
      >
        <div className="relative z-10">
          <h1 className="text-2xl font-manga tracking-wide text-white" style={{ textShadow: "2px 2px 0 rgba(0,0,0,0.2)" }}>
            {t.dashboard.welcome}! ⚡
          </h1>
          <p className="mt-2 text-sm text-white/80 font-medium">{t.dashboard.welcomeDesc}</p>
          <motion.button
            whileHover={{ scale: 1.05, x: 4 }}
            whileTap={{ scale: 0.95 }}
            className="mt-4 manga-outline-sm bg-white text-primary px-6 py-2.5 text-sm font-bold cursor-pointer"
          >
            <Plus size={14} className="inline mr-1" />
            {t.dashboard.postINeed}
          </motion.button>
        </div>
      </motion.div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.key}
              initial={{ opacity: 0, y: 20, rotate: -1 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ delay: i * 0.08, type: "spring" }}
              className="manga-panel bg-white p-5"
            >
              <div className={`flex h-10 w-10 items-center justify-center manga-outline-sm ${stat.bg}`}>
                <Icon size={20} className={stat.color} />
              </div>
              <p className="mt-4 text-2xl font-manga tracking-wide text-foreground">{stat.value}</p>
              <p className="mt-1 text-xs font-bold text-foreground/50">{t.dashboard[stat.key as keyof typeof t.dashboard]}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Recent listings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="manga-panel bg-white"
      >
        <div className="flex items-center justify-between px-5 py-4 border-b-[3px] border-foreground">
          <h3 className="text-sm font-manga tracking-wide text-foreground">{t.dashboard.recentListings}</h3>
          <button className="text-xs font-bold text-primary hover:underline cursor-pointer">{t.dashboard.viewAll}</button>
        </div>
        {recentListings.map((listing) => (
          <div
            key={listing.id}
            className="flex items-center justify-between px-5 py-4 border-b-2 border-foreground/10 last:border-0 hover:bg-muted/50 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <span className="text-lg">{listing.emoji}</span>
              <div>
                <p className="text-sm font-bold text-foreground">{listing.title}</p>
                <p className="text-[11px] text-foreground/40">{listing.category}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-manga text-foreground">{listing.price}</span>
              <span
                className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-bold manga-outline-sm ${
                  listing.status === "active"
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-amber-100 text-amber-700"
                }`}
              >
                {listing.status}
              </span>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
