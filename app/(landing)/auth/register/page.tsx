"use client";

import Link from "next/link";
import Image from "next/image";
import { useI18n } from "@/lib/i18n";
import { createClient } from "@/lib/supabase/client";
import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "@/components/icons";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { SpeedLines, HalftoneOverlay } from "@/components/manga/Elements";

export default function RegisterPage() {
  const { t } = useI18n();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const supabase = createClient();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!name || !email || !password) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } },
    });
    if (error) {
      setError(error.message);
      toast.error(error.message);
      setLoading(false);
    } else {
      toast.success("Account created! Check your email.");
      setSuccess(true);
      setLoading(false);
    }
  };

  const handleOAuth = async (provider: "google" | "github") => {
    setError("");
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
    if (error) {
      setError(error.message);
      toast.error(error.message);
    }
  };

  if (success) {
    return (
      <div className="relative min-h-screen bg-background flex items-center justify-center px-4 py-12 overflow-hidden">
        <SpeedLines count={15} />
        <HalftoneOverlay className="!opacity-[0.04]" />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-10 manga-panel bg-white p-10 text-center max-w-sm"
        >
          <span className="text-5xl mb-4 block">✉️</span>
          <h2 className="text-xl font-manga tracking-wide text-foreground" style={{ textShadow: "2px 2px 0 rgba(45,138,86,0.1)" }}>
            {t.auth.checkEmail || "Check your email!"}
          </h2>
          <p className="mt-2 text-sm text-foreground/50">
            {t.auth.checkEmailDesc || "We sent a confirmation link to verify your account."}
          </p>
          <Link href="/auth/login" className="mt-6 inline-block manga-outline-sm bg-primary px-6 py-2.5 text-sm font-bold text-white hover:bg-primary/90 transition-all">
            {t.auth.loginButton}
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-background flex items-center justify-center px-4 py-12 overflow-hidden">
      <SpeedLines count={15} />
      <HalftoneOverlay className="!opacity-[0.04]" />

      <span className="absolute top-10 right-[10%] font-manga text-primary/[0.05] text-6xl select-none pointer-events-none">JOIN</span>
      <span className="absolute bottom-10 left-[5%] font-manga text-accent/[0.04] text-5xl select-none pointer-events-none">US!</span>

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="relative z-10 w-full max-w-sm"
      >
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6 group">
            <Image src="/images/ineed-logo.jpg" alt="ineed" width={40} height={40} className="h-10 w-10 rounded-xl object-cover manga-outline-sm" />
            <span
              className="text-xl font-manga tracking-wide text-foreground group-hover:text-primary transition-colors"
              style={{ textShadow: "2px 2px 0 rgba(45,138,86,0.15)" }}
            >
              i<span className="text-primary">Need</span>
            </span>
          </Link>
          <h1 className="text-2xl font-manga tracking-wide text-foreground" style={{ textShadow: "2px 2px 0 rgba(45,138,86,0.1)" }}>
            {t.auth.registerTitle || "Create your account"}
          </h1>
          <p className="mt-2 text-sm text-foreground/50">{t.auth.registerDesc || "Join thousands of freelancers and businesses."}</p>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 manga-outline-sm bg-destructive/10 border-destructive/20 px-4 py-3 text-sm font-bold text-destructive text-center"
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-foreground/60 mb-1.5">{t.auth.name || "Name"}</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full manga-outline bg-white px-4 py-3 text-sm text-foreground placeholder-foreground/30 outline-none transition-all focus:border-primary focus:shadow-[4px_4px_0_var(--color-primary)]"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-foreground/60 mb-1.5">{t.auth.email}</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full manga-outline bg-white px-4 py-3 text-sm text-foreground placeholder-foreground/30 outline-none transition-all focus:border-primary focus:shadow-[4px_4px_0_var(--color-primary)]"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-foreground/60 mb-1.5">{t.auth.password}</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full manga-outline bg-white px-4 py-3 pr-10 text-sm text-foreground placeholder-foreground/30 outline-none transition-all focus:border-primary focus:shadow-[4px_4px_0_var(--color-primary)]"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/30 hover:text-foreground/60 cursor-pointer"
              >
                {showPassword ? <EyeOffIcon size={16} /> : <EyeIcon size={16} />}
              </button>
            </div>
            <p className="mt-1 text-[10px] text-foreground/40">Must be at least 6 characters</p>
          </div>
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full manga-outline-sm bg-primary py-3 text-sm font-bold text-white transition-all duration-200 hover:bg-primary/90 disabled:opacity-50 cursor-pointer"
          >
            {loading ? "..." : t.auth.registerButton || "Create Account"}
          </motion.button>
        </form>

        <div className="my-6 flex items-center gap-3">
          <div className="flex-1 h-px bg-border" />
          <span className="text-xs font-semibold text-foreground/30">{t.auth.orContinueWith}</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <motion.button
            onClick={() => handleOAuth("google")}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="manga-outline bg-white py-3 text-sm font-bold text-foreground/70 transition-colors hover:bg-muted cursor-pointer"
          >
            {t.auth.google}
          </motion.button>
          <motion.button
            onClick={() => handleOAuth("github")}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="manga-outline bg-white py-3 text-sm font-bold text-foreground/70 transition-colors hover:bg-muted cursor-pointer"
          >
            {t.auth.github}
          </motion.button>
        </div>

        <p className="mt-8 text-center text-sm text-foreground/50">
          {t.auth.hasAccount || "Already have an account?"}{" "}
          <Link href="/auth/login" className="font-bold text-primary hover:underline cursor-pointer">
            {t.auth.loginButton}
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
