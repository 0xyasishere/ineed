"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { useAuth } from "@/lib/auth";
import { createClient } from "@/lib/supabase/client";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  FileTextIcon,
  SendIcon,
  WalletIcon,
  CheckCircleIcon,
  PlusIcon,
} from "@/components/icons";

export default function DashboardOverview() {
  const { t } = useI18n();
  const { user } = useAuth();
  const supabase = createClient();
  const [stats, setStats] = useState({ services: 0, jobs: 0, proposals: 0, earnings: 0 });
  const [recentListings, setRecentListings] = useState<Array<{ id: string; title: string; category: string; price: string; status: string; emoji: string; type: string }>>([]);

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      const [servicesRes, jobsRes, proposalsRes, transactionsRes] = await Promise.all([
        supabase.from("services").select("id", { count: "exact", head: true }).eq("user_id", user.id).eq("status", "active"),
        supabase.from("jobs").select("id", { count: "exact", head: true }).eq("user_id", user.id).eq("status", "active"),
        supabase.from("proposals").select("id", { count: "exact", head: true }).eq("user_id", user.id).eq("status", "pending"),
        supabase.from("transactions").select("amount").eq("user_id", user.id).eq("type", "income"),
      ]);

      const earnings = transactionsRes.data?.reduce((sum, t) => sum + Number(t.amount), 0) || 0;

      setStats({
        services: servicesRes.count || 0,
        jobs: jobsRes.count || 0,
        proposals: proposalsRes.count || 0,
        earnings,
      });

      const [servicesList, jobsList] = await Promise.all([
        supabase.from("services").select("id, title, category, price, status").eq("user_id", user.id).order("created_at", { ascending: false }).limit(4),
        supabase.from("jobs").select("id, title, category, budget, status").eq("user_id", user.id).order("created_at", { ascending: false }).limit(4),
      ]);

      const serviceEmojis: Record<string, string> = {
        "Web Development": "🌐", "UI/UX Design": "🎨", "Branding": "🖌️",
        "Copywriting": "✍️", "Marketing": "📈", "Mobile Apps": "📱",
      };

      const allListings = [
        ...(servicesList.data || []).map((s) => ({ id: s.id, title: s.title, category: s.category, price: `$${s.price}`, status: s.status, emoji: serviceEmojis[s.category] || "📋", type: "service" })),
        ...(jobsList.data || []).map((j) => ({ id: j.id, title: j.title, category: j.category, price: `$${j.budget}`, status: j.status, emoji: "💼", type: "job" })),
      ].slice(0, 4);

      setRecentListings(allListings);
    };

    fetchData();
  }, [user]);

  const statItems = [
    { key: "activeListings", value: String(stats.services + stats.jobs), icon: FileTextIcon, color: "text-primary", bg: "bg-primary/10" },
    { key: "pendingProposals", value: String(stats.proposals), icon: SendIcon, color: "text-accent", bg: "bg-accent/10" },
    { key: "totalEarnings", value: `$${stats.earnings.toLocaleString()}`, icon: WalletIcon, color: "text-gold", bg: "bg-gold/10" },
    { key: "completedJobs", value: String(stats.services + stats.jobs), icon: CheckCircleIcon, color: "text-secondary", bg: "bg-secondary/10" },
  ];

  return (
    <div className="space-y-6">
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
          <Link href="/dashboard/post">
            <motion.button
              whileHover={{ scale: 1.05, x: 4 }}
              whileTap={{ scale: 0.95 }}
              className="mt-4 manga-outline-sm bg-white text-primary px-6 py-2.5 text-sm font-bold cursor-pointer flex items-center gap-1.5"
            >
              <PlusIcon size={14} />
              {t.dashboard.postINeed}
            </motion.button>
          </Link>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {statItems.map((stat, i) => {
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

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="manga-panel bg-white"
      >
        <div className="flex items-center justify-between px-5 py-4 border-b-[3px] border-foreground">
          <h3 className="text-sm font-manga tracking-wide text-foreground">{t.dashboard.recentListings}</h3>
          <Link href="/dashboard/my-posts" className="text-xs font-bold text-primary hover:underline cursor-pointer">{t.dashboard.viewAll}</Link>
        </div>
        {recentListings.length === 0 ? (
          <div className="px-5 py-8 text-center">
            <p className="text-sm text-foreground/40">No listings yet. Post your first I Need!</p>
          </div>
        ) : (
          recentListings.map((listing) => (
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
          ))
        )}
      </motion.div>
    </div>
  );
}
