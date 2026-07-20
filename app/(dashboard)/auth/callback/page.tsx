"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();

    const handleAuth = async () => {
      const { error } = await supabase.auth.exchangeCodeForSession(
        window.location.search
      );

      if (!error) {
        router.replace("/dashboard");
      } else {
        router.replace("/auth/login?error=auth_failed");
      }
    };

    const hash = window.location.hash;
    if (hash && hash.includes("access_token")) {
      supabase.auth.onAuthStateChange((event, session) => {
        if (session) {
          router.replace("/dashboard");
        }
      });
    } else {
      handleAuth();
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin mx-auto" />
        <p className="text-sm text-foreground/50 font-bold">Signing you in...</p>
      </div>
    </div>
  );
}
