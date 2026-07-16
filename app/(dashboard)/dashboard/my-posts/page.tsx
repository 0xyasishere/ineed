"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/lib/auth";
import { useI18n } from "@/lib/i18n";
import { ExternalLinkIcon, TrashIcon, EyeIcon } from "@/components/icons";

interface MyPost {
  id: string;
  type: "service" | "job";
  title: string;
  description: string;
  price: number;
  currency: string;
  category: string;
  status: string;
  tags: string[];
  url?: string;
  created_at: string;
}

const categoryColors: Record<string, string> = {
  "Web Development": "bg-[#E8F0EA] text-[#2D8A56]",
  "UI/UX Design": "bg-[#F0E6FA] text-[#7B3FA0]",
  "Branding": "bg-[#FFF0E6] text-[#D4740E]",
  "Copywriting": "bg-[#E6F4FA] text-[#0E74D4]",
  "Marketing": "bg-[#FAF0E6] text-[#D4A00E]",
  "Data Engineering": "bg-[#F0FAE6] text-[#4DA00E]",
  "Content Writing": "bg-[#FAE6F0] text-[#D40E74]",
  "DevOps": "bg-[#E6F0FA] text-[#0E50D4]",
  "Mobile Apps": "bg-[#F5F0FA] text-[#8B3FA0]",
  "Community": "bg-[#E8F0EA] text-[#2D8A56]",
  "Support": "bg-[#FFF0E6] text-[#D4740E]",
  "Ambassador": "bg-[#E6F4FA] text-[#0E74D4]",
};

const statusColors: Record<string, string> = {
  active: "bg-[#E8F0EA] text-[#2D8A56] border-[#2D8A56]",
  draft: "bg-foreground/5 text-foreground/50 border-foreground/20",
  closed: "bg-red-50 text-red-500 border-red-300",
};

const statusLabels: Record<string, Record<string, string>> = {
  id: { active: "Aktif", draft: "Draft", closed: "Tutup" },
  en: { active: "Active", draft: "Draft", closed: "Closed" },
};

export default function MyPostsPage() {
  const { user } = useAuth();
  const { t, locale } = useI18n();
  const [posts, setPosts] = useState<MyPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "service" | "job">("all");
  const supabase = createClient();

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchPosts = async () => {
      const [servicesRes, jobsRes] = await Promise.all([
        supabase.from("services").select("*").eq("user_id", user.id).order("created_at", { ascending: false }),
        supabase.from("jobs").select("*").eq("user_id", user.id).order("created_at", { ascending: false }),
      ]);

      const services: MyPost[] = (servicesRes.data || []).map((s: Record<string, unknown>) => ({
        id: s.id as string,
        type: "service" as const,
        title: s.title as string,
        description: s.description as string,
        price: s.price as number,
        currency: "$",
        category: s.category as string,
        status: s.status as string,
        tags: [],
        url: undefined,
        created_at: s.created_at as string,
      }));

      const jobs: MyPost[] = (jobsRes.data || []).map((j: Record<string, unknown>) => ({
        id: j.id as string,
        type: "job" as const,
        title: j.title as string,
        description: j.description as string,
        price: j.budget as number,
        currency: "$",
        category: j.category as string,
        status: j.status as string,
        tags: (j.tags as string[]) || [],
        url: j.url as string || undefined,
        created_at: j.created_at as string,
      }));

      setPosts([...services, ...jobs].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()));
      setLoading(false);
    };

    fetchPosts();
  }, [user]);

  const handleDelete = async (post: MyPost) => {
    if (!confirm("Delete this post?")) return;
    const table = post.type === "service" ? "services" : "jobs";
    await supabase.from(table).delete().eq("id", post.id);
    setPosts((prev) => prev.filter((p) => p.id !== post.id));
  };

  const filtered = filter === "all" ? posts : posts.filter((p) => p.type === filter);

  const serviceCount = posts.filter((p) => p.type === "service").length;
  const jobCount = posts.filter((p) => p.type === "job").length;

  return (
    <div className="min-h-screen bg-muted">
      <div className="max-w-5xl mx-auto px-4 py-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-manga tracking-wide text-foreground mb-2" style={{ textShadow: "2px 2px 0 rgba(45,138,86,0.15)" }}>
            {t.myPosts.title}
          </h1>
          <p className="text-foreground/50 text-sm mb-8">{t.myPosts.subtitle}</p>
        </motion.div>

        {/* Filter tabs */}
        <div className="flex items-center gap-2 mb-8">
          {(["all", "service", "job"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`manga-outline-sm px-4 py-2 text-sm font-bold transition-all cursor-pointer ${
                filter === f
                  ? "bg-white text-primary shadow-[2px_2px_0_var(--color-primary)] border-foreground"
                  : "bg-white/50 text-foreground/50 hover:text-foreground/70"
              }`}
            >
              {f === "all" && `${t.myPosts.all} (${posts.length})`}
              {f === "service" && `${t.tabs.services} (${serviceCount})`}
              {f === "job" && `${t.tabs.jobs} (${jobCount})`}
            </button>
          ))}
        </div>

        {/* Posts list */}
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="manga-panel bg-white p-6 animate-pulse">
                <div className="h-5 bg-foreground/10 rounded w-1/3 mb-3" />
                <div className="h-4 bg-foreground/5 rounded w-2/3" />
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="manga-panel bg-white text-center py-16">
            <p className="text-4xl mb-4">📭</p>
            <p className="font-manga text-lg text-foreground/60 mb-2">
              {filter === "all" ? t.myPosts.empty : filter === "service" ? t.myPosts.noServices : t.myPosts.noJobs}
            </p>
            <p className="text-sm text-foreground/40">{t.myPosts.emptyHint}</p>
          </motion.div>
        ) : (
          <div className="space-y-4">
            <AnimatePresence>
              {filtered.map((post, i) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: i * 0.05 }}
                  className="manga-panel bg-white p-5 hover:shadow-[4px_4px_0_var(--color-primary)] transition-shadow"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span className="text-xs font-manga text-foreground/40 uppercase">
                          {post.type === "service" ? "🔧 " + t.tabs.services : "💼 " + t.tabs.jobs}
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 border ${categoryColors[post.category] || "bg-foreground/5 text-foreground/50"}`}>
                          {post.category}
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 border ${statusColors[post.status] || ""}`}>
                          {statusLabels[locale]?.[post.status] || post.status}
                        </span>
                      </div>
                      <h3 className="font-bold text-foreground mb-1 truncate">{post.title}</h3>
                      <p className="text-sm text-foreground/50 line-clamp-2 mb-2">{post.description}</p>
                      <div className="flex items-center gap-4 text-xs text-foreground/40">
                        <span className="font-manga text-primary font-bold">{post.currency}{post.price.toLocaleString()}</span>
                        {post.tags.length > 0 && (
                          <span className="flex gap-1">
                            {post.tags.map((tag) => (
                              <span key={tag} className="bg-muted px-1.5 py-0.5 text-foreground/50">{tag}</span>
                            ))}
                          </span>
                        )}
                        {post.url && (
                          <a href={post.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-primary hover:underline">
                            <ExternalLinkIcon size={12} /> View
                          </a>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => handleDelete(post)}
                        className="manga-outline-sm p-2 text-foreground/30 hover:text-red-500 hover:border-red-300 transition-all cursor-pointer"
                        title="Delete"
                      >
                        <TrashIcon size={14} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
