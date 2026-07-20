"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { StarIcon } from "@/components/icons";
import Link from "next/link";

interface ServiceDetail {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  delivery_days: number;
  created_at: string;
  profiles: { name: string; avatar_url: string; bio: string; location: string } | null;
}

const categoryIcons: Record<string, string> = {
  "UI/UX Design": "🎨", "Web Development": "💻", "Branding": "✨",
  "Copywriting": "✍️", "Mobile Apps": "📱", "Marketing": "📈",
};

export default function ServiceDetailPage() {
  const params = useParams();
  const supabase = createClient();
  const [service, setService] = useState<ServiceDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchService = async () => {
      const { data } = await supabase
        .from("services")
        .select("*, profiles(name, avatar_url, bio, location)")
        .eq("id", params.id)
        .single();
      setService(data);
      setLoading(false);
    };
    fetchService();
  }, [params.id]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
          </div>
        ) : !service ? (
          <div className="text-center py-20">
            <p className="text-4xl mb-3">🔍</p>
            <p className="font-manga text-lg text-foreground/50">Service not found</p>
            <Link href="/" className="mt-4 inline-block text-sm font-bold text-primary hover:underline">Back to Home</Link>
          </div>
        ) : (
          <div className="space-y-6">
            <Link href="/" className="text-sm font-bold text-primary hover:underline">← Back</Link>

            <div className="manga-panel bg-white p-6 sm:p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl manga-outline bg-primary/10 text-3xl">
                  {categoryIcons[service.category] || "💼"}
                </div>
                <div className="flex-1">
                  <span className="manga-outline-sm bg-primary/10 px-2.5 py-0.5 text-[10px] font-bold text-primary">{service.category}</span>
                  <h1 className="mt-2 text-xl font-manga tracking-wide text-foreground">{service.title}</h1>
                  <div className="mt-1 flex items-center gap-2">
                    <StarIcon size={12} className="fill-accent text-accent" />
                    <span className="text-xs font-bold text-foreground/60">4.8</span>
                    <span className="text-xs text-foreground/40">• {service.delivery_days} day delivery</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-manga text-primary">${service.price}</p>
                </div>
              </div>

              <div className="border-t-2 border-dashed border-foreground/10 pt-6">
                <h3 className="text-sm font-manga tracking-wide text-foreground mb-3">About this service</h3>
                <p className="text-sm text-foreground/70 leading-relaxed whitespace-pre-wrap">{service.description}</p>
              </div>
            </div>

            {service.profiles && (
              <div className="manga-panel bg-white p-6">
                <h3 className="text-sm font-manga tracking-wide text-foreground mb-4">About the seller</h3>
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                    {service.profiles.name?.[0] || "U"}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground">{service.profiles.name}</p>
                    <p className="text-xs text-foreground/50">{service.profiles.location || "Location not set"}</p>
                    {service.profiles.bio && <p className="text-xs text-foreground/60 mt-1">{service.profiles.bio}</p>}
                  </div>
                </div>
              </div>
            )}

            <button className="w-full manga-outline-sm bg-primary px-6 py-3 text-sm font-bold text-white transition-all hover:bg-primary/90 hover:shadow-lg cursor-pointer">
              Contact Seller
            </button>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
