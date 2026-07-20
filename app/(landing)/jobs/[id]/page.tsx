"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Link from "next/link";

interface JobDetail {
  id: string;
  title: string;
  description: string;
  budget: number;
  category: string;
  tags: string[];
  url: string;
  status: string;
  created_at: string;
  profiles: { name: string; avatar_url: string } | null;
}

export default function JobDetailPage() {
  const params = useParams();
  const supabase = createClient();
  const [job, setJob] = useState<JobDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      const { data } = await supabase
        .from("jobs")
        .select("*, profiles(name, avatar_url)")
        .eq("id", params.id)
        .single();
      setJob(data);
      setLoading(false);
    };
    fetchJob();
  }, [params.id]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
          </div>
        ) : !job ? (
          <div className="text-center py-20">
            <p className="text-4xl mb-3">🔍</p>
            <p className="font-manga text-lg text-foreground/50">Job not found</p>
            <Link href="/" className="mt-4 inline-block text-sm font-bold text-primary hover:underline">Back to Home</Link>
          </div>
        ) : (
          <div className="space-y-6">
            <Link href="/" className="text-sm font-bold text-primary hover:underline">← Back</Link>

            <div className="manga-panel bg-white p-6 sm:p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl manga-outline bg-primary/10 text-2xl font-manga text-primary">
                  💼
                </div>
                <div className="flex-1">
                  <span className="manga-outline-sm bg-accent/10 px-2.5 py-0.5 text-[10px] font-bold text-accent">{job.category}</span>
                  <h1 className="mt-2 text-xl font-manga tracking-wide text-foreground">{job.title}</h1>
                  <p className="mt-1 text-xs text-foreground/50">Posted by {job.profiles?.name || "Anonymous"} • {new Date(job.created_at).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-manga text-primary">${job.budget}</p>
                  <p className="text-[10px] text-foreground/40">budget</p>
                </div>
              </div>

              {job.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {job.tags.map((tag) => (
                    <span key={tag} className="manga-outline-sm bg-muted px-3 py-1 text-xs font-bold text-foreground/65">{tag}</span>
                  ))}
                </div>
              )}

              <div className="border-t-2 border-dashed border-foreground/10 pt-6">
                <h3 className="text-sm font-manga tracking-wide text-foreground mb-3">Job Description</h3>
                <p className="text-sm text-foreground/70 leading-relaxed whitespace-pre-wrap">{job.description}</p>
              </div>

              {job.url && (
                <a
                  href={job.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 block w-full manga-outline-sm bg-primary px-6 py-3 text-sm font-bold text-white text-center transition-all hover:bg-primary/90 hover:shadow-lg"
                >
                  Apply Now →
                </a>
              )}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
