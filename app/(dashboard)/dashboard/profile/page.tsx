"use client";

import { useI18n } from "@/lib/i18n";
import { useAuth } from "@/lib/auth";
import { createClient } from "@/lib/supabase/client";
import { CameraIcon } from "@/components/icons";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface Profile {
  id: string;
  name: string;
  bio: string;
  avatar_url: string;
  location: string;
  skills: string[];
  social_x: string;
  social_telegram: string;
  social_instagram: string;
  social_threads: string;
  social_youtube: string;
  show_x: boolean;
  show_telegram: boolean;
  show_instagram: boolean;
  show_threads: boolean;
  show_youtube: boolean;
}

const socialFields = [
  { key: "social_x", label: "X (Twitter)", showKey: "show_x", icon: "𝕏", placeholder: "@username" },
  { key: "social_telegram", label: "Telegram", showKey: "show_telegram", icon: "✈️", placeholder: "@username" },
  { key: "social_instagram", label: "Instagram", showKey: "show_instagram", icon: "📸", placeholder: "@username" },
  { key: "social_threads", label: "Threads", showKey: "show_threads", icon: "🧵", placeholder: "@username" },
  { key: "social_youtube", label: "YouTube", showKey: "show_youtube", icon: "🎬", placeholder: "Channel URL" },
];

export default function ProfilePage() {
  const { t } = useI18n();
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [newSkill, setNewSkill] = useState("");
  const supabase = createClient();

  useEffect(() => {
    if (!user) return;
    supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single()
      .then(({ data }) => {
        if (data) setProfile(data);
        setLoading(false);
      });
  }, [user]);

  const handleChange = (field: string, value: string | boolean | string[]) => {
    if (!profile) return;
    setProfile({ ...profile, [field]: value });
  };

  const handleSave = async () => {
    if (!profile || !user) return;
    setSaving(true);
    const { error } = await supabase
      .from("profiles")
      .upsert({ ...profile, id: user.id }, { onConflict: "id" });
    if (!error) {
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
    setSaving(false);
  };

  const addSkill = () => {
    if (!newSkill.trim() || !profile) return;
    handleChange("skills", [...profile.skills, newSkill.trim()]);
    setNewSkill("");
  };

  const removeSkill = (skill: string) => {
    if (!profile) return;
    handleChange("skills", profile.skills.filter((s) => s !== skill));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
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
        <h1 className="text-2xl font-manga text-foreground">👤 {t.dashboard.profileTitle}</h1>
        <p className="mt-1 text-sm text-foreground/50">{t.dashboard.profileDesc}</p>
      </motion.div>

      {/* Basic Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="manga-panel bg-white p-6"
      >
        <h3 className="text-sm font-manga tracking-wide text-foreground mb-4" style={{ textShadow: "1px 1px 0 rgba(45,138,86,0.1)" }}>
          Basic Info
        </h3>

        <div className="flex items-center gap-4 mb-6">
          <div className="relative">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 text-2xl font-extrabold text-primary manga-outline-sm">
              {profile?.name?.[0] || "U"}
            </div>
            <button className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-white cursor-pointer manga-outline-sm">
              <CameraIcon size={12} />
            </button>
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-foreground">{profile?.name || "User"}</h2>
            <p className="text-sm text-foreground/50">{user?.email}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-foreground/60 mb-1.5">Full Name</label>
            <input
              type="text"
              value={profile?.name || ""}
              onChange={(e) => handleChange("name", e.target.value)}
              className="w-full manga-outline bg-white px-4 py-2.5 text-sm text-foreground outline-none transition-all focus:border-primary focus:shadow-[3px_3px_0_var(--color-primary)]"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-foreground/60 mb-1.5">Bio</label>
            <textarea
              rows={3}
              value={profile?.bio || ""}
              onChange={(e) => handleChange("bio", e.target.value)}
              className="w-full manga-outline bg-white px-4 py-2.5 text-sm text-foreground outline-none resize-none transition-all focus:border-primary focus:shadow-[3px_3px_0_var(--color-primary)]"
              placeholder="Tell us about yourself..."
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-foreground/60 mb-1.5">Location</label>
            <input
              type="text"
              value={profile?.location || ""}
              onChange={(e) => handleChange("location", e.target.value)}
              className="w-full manga-outline bg-white px-4 py-2.5 text-sm text-foreground outline-none transition-all focus:border-primary focus:shadow-[3px_3px_0_var(--color-primary)]"
              placeholder="Jakarta, Indonesia"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-foreground/60 mb-1.5">Skills</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {(profile?.skills || []).map((skill) => (
                <span key={skill} className="inline-flex items-center gap-1 rounded-lg bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                  {skill}
                  <button onClick={() => removeSkill(skill)} className="ml-1 text-primary/50 hover:text-primary cursor-pointer">×</button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
                className="flex-1 manga-outline bg-white px-4 py-2 text-sm text-foreground outline-none transition-all focus:border-primary focus:shadow-[3px_3px_0_var(--color-primary)]"
                placeholder="Add a skill..."
              />
              <button onClick={addSkill} className="manga-outline-sm bg-muted px-4 py-2 text-sm font-bold text-foreground/60 hover:bg-muted/80 cursor-pointer">
                + Add
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Social Links */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="manga-panel bg-white p-6"
      >
        <h3 className="text-sm font-manga tracking-wide text-foreground mb-1" style={{ textShadow: "1px 1px 0 rgba(45,138,86,0.1)" }}>
          Social Links
        </h3>
        <p className="text-xs text-foreground/40 mb-4">Toggle visibility to control which links appear on your public profile.</p>

        <div className="space-y-4">
          {socialFields.map((field) => {
            const isVisible = Boolean((profile as unknown as Record<string, unknown>)?.[field.showKey]);
            return (
              <div key={field.key} className="flex items-center gap-3">
                <span className="text-lg w-7 text-center">{field.icon}</span>
                <div className="flex-1">
                  <input
                    type="text"
                    value={String((profile as unknown as Record<string, unknown>)?.[field.key] || "")}
                    onChange={(e) => handleChange(field.key, e.target.value)}
                    className="w-full manga-outline bg-white px-4 py-2.5 text-sm text-foreground outline-none transition-all focus:border-primary focus:shadow-[3px_3px_0_var(--color-primary)]"
                    placeholder={field.placeholder}
                  />
                </div>
                <label className="flex items-center gap-2 cursor-pointer shrink-0">
                  <span className="text-[10px] font-bold text-foreground/40">Show</span>
                  <div
                    onClick={() => handleChange(field.showKey, !isVisible)}
                    className={`relative inline-flex h-6 w-11 cursor-pointer rounded-full transition-colors ${isVisible ? "bg-primary" : "bg-foreground/20"}`}
                  >
                    <span className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${isVisible ? "translate-x-5" : ""}`} />
                  </div>
                </label>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Save Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <motion.button
          onClick={handleSave}
          disabled={saving}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="manga-outline-sm bg-primary px-8 py-3 text-sm font-bold text-white transition-all duration-200 hover:bg-primary/90 hover:shadow-lg cursor-pointer disabled:opacity-50"
        >
          {saving ? "..." : saved ? "✓ Saved!" : "Save Changes"}
        </motion.button>
      </motion.div>
    </div>
  );
}
