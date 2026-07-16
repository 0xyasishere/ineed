"use client";

import { useI18n } from "@/lib/i18n";
import { Plus, Search, Filter } from "lucide-react";

const posts = [
  { id: "1", title: "Landing Page SaaS Modern", category: "Web Development", price: "$299", status: "active", views: 142, applications: 8 },
  { id: "2", title: "Brand Identity Startup", category: "Branding", price: "$199", status: "active", views: 89, applications: 5 },
  { id: "3", title: "Mobile App UI/UX Design", category: "UI/UX Design", price: "$450", status: "pending", views: 23, applications: 2 },
  { id: "4", title: "SEO Content Writing Pack", category: "Copywriting", price: "$89", status: "active", views: 210, applications: 12 },
  { id: "5", title: "React Native Cross-Platform App", category: "Mobile Apps", price: "$799", status: "paused", views: 67, applications: 3 },
];

export default function MyPostsPage() {
  const { t } = useI18n();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-foreground">{t.dashboard.myPostsTitle}</h1>
          <p className="mt-1 text-sm text-foreground/50">{t.dashboard.myPostsDesc}</p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white transition-all duration-200 hover:bg-primary/90 hover:shadow-lg cursor-pointer self-start">
          <Plus size={16} />
          {t.dashboard.postINeed}
        </button>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex-1 flex items-center gap-2 rounded-xl bg-white border border-border px-4 py-2.5">
          <Search size={16} className="text-foreground/40" />
          <input
            type="text"
            placeholder={t.dashboard.searchPlaceholder}
            className="flex-1 bg-transparent text-sm text-foreground placeholder-foreground/40 outline-none"
          />
        </div>
        <button className="inline-flex items-center gap-2 rounded-xl bg-white border border-border px-4 py-2.5 text-sm font-semibold text-foreground/60 transition-colors hover:bg-muted cursor-pointer">
          <Filter size={14} />
          Filter
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="rounded-2xl bg-white border border-border p-5 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20 cursor-pointer"
          >
            <div className="flex items-start justify-between">
              <h3 className="text-sm font-bold text-foreground">{post.title}</h3>
              <span
                className={`shrink-0 inline-flex rounded-full px-2 py-0.5 text-[10px] font-bold ${
                  post.status === "active"
                    ? "bg-emerald-100 text-emerald-700"
                    : post.status === "pending"
                    ? "bg-amber-100 text-amber-700"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                {post.status}
              </span>
            </div>
            <span className="mt-2 inline-flex rounded-full bg-muted px-2.5 py-0.5 text-[11px] font-bold text-foreground/60">
              {post.category}
            </span>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-lg font-extrabold text-foreground">{post.price}</span>
              <div className="flex items-center gap-3 text-[11px] font-semibold text-foreground/40">
                <span>{post.views} views</span>
                <span>{post.applications} apps</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
