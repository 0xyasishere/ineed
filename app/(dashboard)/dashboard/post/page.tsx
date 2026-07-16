"use client";

import { useI18n } from "@/lib/i18n";
import { useAuth } from "@/lib/auth";
import { createClient } from "@/lib/supabase/client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { SpeedLines, HalftoneOverlay } from "@/components/manga/Elements";
import { PlusIcon, CloseIcon } from "@/components/icons";

type PostType = "service" | "job";

const categories = [
  "Web Development",
  "UI/UX Design",
  "Mobile Apps",
  "Branding",
  "Copywriting",
  "Marketing",
  "Content Writing",
  "Data Engineering",
  "DevOps",
  "Other",
];

export default function PostINeedPage() {
  const { t } = useI18n();
  const { user } = useAuth();
  const router = useRouter();
  const [postType, setPostType] = useState<PostType>("service");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const supabase = createClient();

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    category: "Web Development",
    deliveryDays: "7",
    budget: "",
    tags: [] as string[],
    url: "",
  });

  const [newTag, setNewTag] = useState("");

  const handleChange = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const addTag = () => {
    if (newTag.trim() && !form.tags.includes(newTag.trim())) {
      setForm({ ...form, tags: [...form.tags, newTag.trim()] });
      setNewTag("");
    }
  };

  const removeTag = (tag: string) => {
    setForm({ ...form, tags: form.tags.filter((t) => t !== tag) });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);

    if (postType === "service") {
      const { error } = await supabase.from("services").insert({
        user_id: user.id,
        title: form.title,
        description: form.description,
        price: parseFloat(form.price) || 0,
        category: form.category,
        delivery_days: parseInt(form.deliveryDays) || 7,
      });
      if (!error) setSuccess(true);
    } else {
      const { error } = await supabase.from("jobs").insert({
        user_id: user.id,
        title: form.title,
        description: form.description,
        budget: parseFloat(form.budget) || 0,
        category: form.category,
        tags: form.tags,
        url: form.url,
      });
      if (!error) setSuccess(true);
    }

    setLoading(false);
  };

  if (success) {
    return (
      <div className="space-y-6 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="manga-panel bg-white p-10 text-center"
        >
          <span className="text-5xl mb-4 block">🎉</span>
          <h2 className="text-xl font-manga tracking-wide text-foreground" style={{ textShadow: "2px 2px 0 rgba(45,138,86,0.1)" }}>
            {postType === "service" ? "Service Posted!" : "Job Posted!"}
          </h2>
          <p className="mt-2 text-sm text-foreground/50">
            Your {postType} is now live and visible to others.
          </p>
          <div className="mt-6 flex gap-3 justify-center">
            <motion.button
              onClick={() => { setSuccess(false); setForm({ title: "", description: "", price: "", category: "Web Development", deliveryDays: "7", budget: "", tags: [], url: "" }); }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="manga-outline-sm bg-primary px-6 py-2.5 text-sm font-bold text-white hover:bg-primary/90 cursor-pointer"
            >
              Post Another
            </motion.button>
            <motion.button
              onClick={() => router.push("/dashboard/my-posts")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="manga-outline-sm bg-muted px-6 py-2.5 text-sm font-bold text-foreground/70 hover:bg-muted/80 cursor-pointer"
            >
              View My Posts
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-2xl font-manga text-foreground">📝 {t.dashboard.postINeed}</h1>
        <p className="mt-1 text-sm text-foreground/50">Share your service or find talent for your project.</p>
      </motion.div>

      {/* Post Type Toggle */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="flex gap-2"
      >
        <button
          onClick={() => setPostType("service")}
          className={`manga-outline-sm px-6 py-3 text-sm font-bold transition-all cursor-pointer ${
            postType === "service"
              ? "bg-primary text-white"
              : "bg-muted text-foreground/60 hover:bg-muted/80"
          }`}
        >
          ✨ Offer a Service
        </button>
        <button
          onClick={() => setPostType("job")}
          className={`manga-outline-sm px-6 py-3 text-sm font-bold transition-all cursor-pointer ${
            postType === "job"
              ? "bg-primary text-white"
              : "bg-muted text-foreground/60 hover:bg-muted/80"
          }`}
        >
          💼 Post a Job
        </button>
      </motion.div>

      {/* Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="relative overflow-hidden manga-panel bg-white p-6"
      >
        <SpeedLines count={8} className="!opacity-[0.03]" />
        <HalftoneOverlay className="!opacity-[0.02]" />

        <form onSubmit={handleSubmit} className="relative z-10 space-y-5">
          <div>
            <label className="block text-xs font-bold text-foreground/60 mb-1.5">Title</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => handleChange("title", e.target.value)}
              required
              className="w-full manga-outline bg-white px-4 py-3 text-sm text-foreground placeholder-foreground/30 outline-none transition-all focus:border-primary focus:shadow-[3px_3px_0_var(--color-primary)]"
              placeholder={postType === "service" ? "I will design a modern landing page" : "Need a React developer for e-commerce"}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-foreground/60 mb-1.5">Description</label>
            <textarea
              rows={4}
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
              required
              className="w-full manga-outline bg-white px-4 py-3 text-sm text-foreground placeholder-foreground/30 outline-none resize-none transition-all focus:border-primary focus:shadow-[3px_3px_0_var(--color-primary)]"
              placeholder="Describe what you offer or what you need..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-foreground/60 mb-1.5">Category</label>
              <select
                value={form.category}
                onChange={(e) => handleChange("category", e.target.value)}
                className="w-full manga-outline bg-white px-4 py-3 text-sm text-foreground outline-none transition-all focus:border-primary focus:shadow-[3px_3px_0_var(--color-primary)] cursor-pointer"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {postType === "service" ? (
              <div>
                <label className="block text-xs font-bold text-foreground/60 mb-1.5">Price ($)</label>
                <input
                  type="number"
                  value={form.price}
                  onChange={(e) => handleChange("price", e.target.value)}
                  required
                  min="0"
                  step="0.01"
                  className="w-full manga-outline bg-white px-4 py-3 text-sm text-foreground placeholder-foreground/30 outline-none transition-all focus:border-primary focus:shadow-[3px_3px_0_var(--color-primary)]"
                  placeholder="0"
                />
              </div>
            ) : (
              <div>
                <label className="block text-xs font-bold text-foreground/60 mb-1.5">Budget ($)</label>
                <input
                  type="number"
                  value={form.budget}
                  onChange={(e) => handleChange("budget", e.target.value)}
                  min="0"
                  step="0.01"
                  className="w-full manga-outline bg-white px-4 py-3 text-sm text-foreground placeholder-foreground/30 outline-none transition-all focus:border-primary focus:shadow-[3px_3px_0_var(--color-primary)]"
                  placeholder="0 (optional)"
                />
              </div>
            )}
          </div>

          {postType === "service" && (
            <div>
              <label className="block text-xs font-bold text-foreground/60 mb-1.5">Delivery Days</label>
              <input
                type="number"
                value={form.deliveryDays}
                onChange={(e) => handleChange("deliveryDays", e.target.value)}
                min="1"
                className="w-full manga-outline bg-white px-4 py-3 text-sm text-foreground placeholder-foreground/30 outline-none transition-all focus:border-primary focus:shadow-[3px_3px_0_var(--color-primary)]"
                placeholder="7"
              />
            </div>
          )}

          {postType === "job" && (
            <>
              <div>
                <label className="block text-xs font-bold text-foreground/60 mb-1.5">Tags</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {form.tags.map((tag) => (
                    <span key={tag} className="inline-flex items-center gap-1 rounded-lg bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                      {tag}
                      <button type="button" onClick={() => removeTag(tag)} className="ml-1 text-primary/50 hover:text-primary cursor-pointer">×</button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                    className="flex-1 manga-outline bg-white px-4 py-2 text-sm text-foreground outline-none transition-all focus:border-primary focus:shadow-[3px_3px_0_var(--color-primary)]"
                    placeholder="Add a tag..."
                  />
                  <button type="button" onClick={addTag} className="manga-outline-sm bg-muted px-4 py-2 text-sm font-bold text-foreground/60 hover:bg-muted/80 cursor-pointer">
                    + Add
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-foreground/60 mb-1.5">URL (optional)</label>
                <input
                  type="url"
                  value={form.url}
                  onChange={(e) => handleChange("url", e.target.value)}
                  className="w-full manga-outline bg-white px-4 py-3 text-sm text-foreground placeholder-foreground/30 outline-none transition-all focus:border-primary focus:shadow-[3px_3px_0_var(--color-primary)]"
                  placeholder="https://..."
                />
              </div>
            </>
          )}

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full manga-outline-sm bg-primary py-3 text-sm font-bold text-white transition-all duration-200 hover:bg-primary/90 disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
          >
            <PlusIcon size={16} />
            {loading ? "..." : postType === "service" ? "Post Service" : "Post Job"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
