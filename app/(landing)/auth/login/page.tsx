"use client";

import Link from "next/link";
import Image from "next/image";
import { useI18n } from "@/lib/i18n";
import { createClient } from "@supabase/supabase-js";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function LoginPage() {
  const { t } = useI18n();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (!error) window.location.href = "https://app.ineed.my.id/dashboard";
    setLoading(false);
  };

  const handleOAuth = async (provider: "google" | "github") => {
    await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: "https://app.ineed.my.id/auth/callback" },
    });
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <Image src="/images/ineed-logo.jpg" alt="ineed" width={40} height={40} className="h-10 w-10 rounded-xl object-cover" />
            <span className="text-xl font-extrabold text-foreground">ineed</span>
          </Link>
          <h1 className="text-2xl font-extrabold text-foreground">{t.auth.loginTitle}</h1>
          <p className="mt-2 text-sm text-foreground/50">{t.auth.loginDesc}</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-foreground/60 mb-1.5">{t.auth.email}</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-foreground placeholder-foreground/30 outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/10"
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
                className="w-full rounded-xl border border-border bg-white px-4 py-3 pr-10 text-sm text-foreground placeholder-foreground/30 outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/10"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/30 hover:text-foreground/60 cursor-pointer"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            <div className="mt-2 text-right">
              <Link href="/auth/forgot" className="text-xs font-semibold text-primary hover:underline cursor-pointer">
                {t.auth.forgotPassword}
              </Link>
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-primary py-3 text-sm font-bold text-white transition-all duration-200 hover:bg-primary/90 hover:shadow-lg disabled:opacity-50 cursor-pointer"
          >
            {loading ? "..." : t.auth.loginButton}
          </button>
        </form>

        <div className="my-6 flex items-center gap-3">
          <div className="flex-1 h-px bg-border" />
          <span className="text-xs font-semibold text-foreground/30">{t.auth.orContinueWith}</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => handleOAuth("google")}
            className="rounded-xl border border-border bg-white py-3 text-sm font-bold text-foreground/70 transition-colors hover:bg-muted cursor-pointer"
          >
            {t.auth.google}
          </button>
          <button
            onClick={() => handleOAuth("github")}
            className="rounded-xl border border-border bg-white py-3 text-sm font-bold text-foreground/70 transition-colors hover:bg-muted cursor-pointer"
          >
            {t.auth.github}
          </button>
        </div>

        <p className="mt-8 text-center text-sm text-foreground/50">
          {t.auth.noAccount}{" "}
          <Link href="/auth/register" className="font-bold text-primary hover:underline cursor-pointer">
            {t.auth.signUp}
          </Link>
        </p>
      </div>
    </div>
  );
}
