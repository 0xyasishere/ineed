"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/lib/auth";
import { useI18n } from "@/lib/i18n";
import { toast } from "sonner";
import { DataTable } from "@/components/ui/DataTable";
import { myPostColumns, type MyPost } from "@/lib/table-columns";

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
    const { error } = await supabase.from(table).delete().eq("id", post.id);
    
    if (error) {
      toast.error("Failed to delete post. Please try again.");
    } else {
      toast.success("Post deleted successfully!");
      setPosts((prev) => prev.filter((p) => p.id !== post.id));
    }
  };

  const filtered = filter === "all" ? posts : posts.filter((p) => p.type === filter);

  const serviceCount = posts.filter((p) => p.type === "service").length;
  const jobCount = posts.filter((p) => p.type === "job").length;

  // Add handleDelete to columns
  const columnsWithActions = myPostColumns.map((col) => {
    if (col.id === "actions") {
      return {
        ...col,
        cell: ({ row }: { row: { original: MyPost } }) => (
          <button
            onClick={() => handleDelete(row.original)}
            className="p-1.5 manga-outline-sm text-foreground/30 hover:text-red-500 hover:border-red-300 transition-all cursor-pointer"
            title="Delete"
          >
            🗑️
          </button>
        ),
      };
    }
    return col;
  });

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

        {/* Posts table */}
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="manga-panel bg-white p-6 animate-pulse">
                <div className="h-5 bg-foreground/10 rounded w-1/3 mb-3" />
                <div className="h-4 bg-foreground/5 rounded w-2/3" />
              </div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <DataTable
              columns={columnsWithActions}
              data={filtered}
              searchKey="title"
              searchPlaceholder="Search posts..."
              pageSize={10}
            />
          </motion.div>
        )}
      </div>
    </div>
  );
}
