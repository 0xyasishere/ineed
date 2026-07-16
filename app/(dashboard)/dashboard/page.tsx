"use client";

import { useI18n } from "@/lib/i18n";
import {
  FileText,
  Send,
  Wallet,
  CheckCircle,
  Plus,
  ArrowUpRight,
} from "lucide-react";

const stats = [
  { key: "activeListings", value: "12", icon: FileText, color: "bg-primary/10 text-primary" },
  { key: "pendingProposals", value: "5", icon: Send, color: "bg-amber-100 text-amber-600" },
  { key: "totalEarnings", value: "$4,280", icon: Wallet, color: "bg-emerald-100 text-emerald-600" },
  { key: "completedJobs", value: "48", icon: CheckCircle, color: "bg-sky-100 text-sky-600" },
];

const recentListings = [
  { id: "1", title: "Landing Page SaaS Modern", category: "Web Development", price: "$299", status: "active" },
  { id: "2", title: "Brand Identity Startup", category: "Branding", price: "$199", status: "active" },
  { id: "3", title: "Mobile App UI/UX Design", category: "UI/UX Design", price: "$450", status: "pending" },
  { id: "4", title: "SEO Content Writing Pack", category: "Copywriting", price: "$89", status: "active" },
];

export default function DashboardOverview() {
  const { t } = useI18n();

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-foreground">
            {t.dashboard.welcome}, John 👋
          </h1>
          <p className="mt-1 text-sm text-foreground/50">
            {t.dashboard.welcomeDesc}
          </p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white transition-all duration-200 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25 cursor-pointer self-start">
          <Plus size={16} />
          {t.dashboard.postINeed}
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.key}
              className="rounded-2xl bg-white border border-border p-5 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20"
            >
              <div className="flex items-center justify-between">
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${stat.color}`}>
                  <Icon size={20} />
                </div>
                <ArrowUpRight size={16} className="text-foreground/30" />
              </div>
              <p className="mt-4 text-2xl font-extrabold text-foreground">
                {stat.value}
              </p>
              <p className="mt-1 text-xs font-semibold text-foreground/50">
                {t.dashboard[stat.key as keyof typeof t.dashboard]}
              </p>
            </div>
          );
        })}
      </div>

      {/* Recent Listings */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-extrabold text-foreground">
            {t.dashboard.recentListings}
          </h2>
          <button className="text-xs font-bold text-primary hover:text-primary/80 transition-colors cursor-pointer">
            {t.dashboard.viewAll} →
          </button>
        </div>
        <div className="rounded-2xl bg-white border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-5 py-3 text-left text-xs font-bold text-foreground/50 uppercase tracking-wider">
                    {t.dashboard.myPostsTitle}
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-bold text-foreground/50 uppercase tracking-wider">
                    {t.tabs.services}
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-bold text-foreground/50 uppercase tracking-wider">
                    Harga
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-bold text-foreground/50 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentListings.map((listing) => (
                  <tr
                    key={listing.id}
                    className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors"
                  >
                    <td className="px-5 py-4">
                      <p className="text-sm font-bold text-foreground">{listing.title}</p>
                    </td>
                    <td className="px-5 py-4">
                      <span className="inline-flex rounded-full bg-muted px-2.5 py-0.5 text-[11px] font-bold text-foreground/60">
                        {listing.category}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-sm font-extrabold text-foreground">
                        {listing.price}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
                          listing.status === "active"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {listing.status === "active" ? "Active" : "Pending"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
