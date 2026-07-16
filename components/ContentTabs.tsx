"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ServiceGridCard, JobGridCard } from "@/components/Cards";
import type { Service, Job } from "@/types/service";
import { Sparkles, Briefcase, Globe } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const services: Service[] = [
  { id: "s1", title: "I will design a modern SaaS landing page", description: "Clean, conversion-focused landing page design with Figma source files and responsive layouts.", price: 150, currency: "$", category: "UI/UX Design", freelancer: { name: "Sarah Chen", avatar: "", rating: 4.9 }, image: "", deliveryDays: 5 },
  { id: "s2", title: "I will build a full-stack Next.js application", description: "Production-ready web app with auth, database, API routes, and deployment setup included.", price: 499, currency: "$", category: "Web Development", freelancer: { name: "Marcus Rivera", avatar: "", rating: 4.8 }, image: "", deliveryDays: 14 },
  { id: "s3", title: "I will create your brand identity package", description: "Complete brand kit — logo, color palette, typography guide, and social media templates.", price: 275, currency: "$", category: "Branding", freelancer: { name: "Aisha Patel", avatar: "", rating: 5.0 }, image: "", deliveryDays: 7 },
  { id: "s4", title: "I will write high-converting email sequences", description: "5-email nurture sequence optimized for engagement and sales. Includes A/B subject lines.", price: 89, currency: "$", category: "Copywriting", freelancer: { name: "Elena Volkov", avatar: "", rating: 4.7 }, image: "", deliveryDays: 3 },
  { id: "s5", title: "I will develop a React Native mobile app", description: "Cross-platform iOS & Android app with clean architecture, testing, and App Store submission.", price: 799, currency: "$", category: "Mobile Apps", freelancer: { name: "David Kim", avatar: "", rating: 4.9 }, image: "", deliveryDays: 21 },
  { id: "s6", title: "I will set up your Google Ads campaign", description: "Full campaign setup with keyword research, ad copy, bidding strategy, and weekly reporting.", price: 200, currency: "$", category: "Marketing", freelancer: { name: "James O'Connor", avatar: "", rating: 4.6 }, image: "", deliveryDays: 5 },
];

const jobs: Job[] = [
  { id: "j1", title: "React Developer for E-commerce Platform", description: "Need an experienced React developer to build a modern e-commerce storefront with Stripe integration.", budget: 2500, currency: "$", category: "Web Development", postedBy: "TechCorp Inc.", postedAt: "2 hours ago", applicants: 12, image: "", tags: ["React", "TypeScript", "Stripe"] },
  { id: "j2", title: "Mobile App UI/UX Redesign", description: "Looking for a designer to completely revamp our existing fintech app. Must have portfolio.", budget: 1800, currency: "$", category: "UI/UX Design", postedBy: "Finova Labs", postedAt: "5 hours ago", applicants: 8, image: "", tags: ["Figma", "Mobile", "Fintech"] },
  { id: "j3", title: "Content Writer for SaaS Blog", description: "We need a skilled writer for weekly technical blog posts about cloud infrastructure and DevOps.", budget: 800, currency: "$", category: "Content Writing", postedBy: "CloudStack", postedAt: "1 day ago", applicants: 23, image: "", tags: ["Blog", "SaaS", "Technical"] },
  { id: "j4", title: "Python Data Pipeline Engineer", description: "Build an automated ETL pipeline using Python, Airflow, and BigQuery. Ongoing project.", budget: 3200, currency: "$", category: "Data Engineering", postedBy: "DataVerse", postedAt: "3 hours ago", applicants: 6, image: "", tags: ["Python", "Airflow", "BigQuery"] },
  { id: "j5", title: "Brand Identity for AI Startup", description: "Startup seeking a creative designer for full brand identity — logo, guidelines, pitch deck design.", budget: 1200, currency: "$", category: "Branding", postedBy: "NeuralPath AI", postedAt: "12 hours ago", applicants: 15, image: "", tags: ["Logo", "Identity", "Startup"] },
  { id: "j6", title: "DevOps AWS Infrastructure Setup", description: "Configure production AWS infrastructure with Terraform, CI/CD pipelines, and monitoring.", budget: 4000, currency: "$", category: "DevOps", postedBy: "ScaleUp.io", postedAt: "6 hours ago", applicants: 4, image: "", tags: ["AWS", "Terraform", "CI/CD"] },
];

const tabs = [
  { id: "services" as const, labelKey: "services", icon: Sparkles, sfx: "✨" },
  { id: "jobs" as const, labelKey: "jobs", icon: Briefcase, sfx: "💼" },
  { id: "remote" as const, labelKey: "remote", icon: Globe, sfx: "🌀" },
];

export function ContentTabs() {
  const [activeTab, setActiveTab] = useState<"services" | "jobs" | "remote">("services");
  const { t } = useI18n();

  const tabLabels: Record<string, string> = {
    services: t.tabs.services,
    jobs: t.tabs.jobs,
    remote: t.tabs.remote || "Remote Jobs",
  };

  return (
    <section id="services" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex items-center gap-1 manga-outline bg-muted p-1.5 max-w-lg mx-auto mb-12"
      >
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-bold transition-all duration-200 cursor-pointer ${
                activeTab === tab.id
                  ? "bg-white text-primary shadow-[3px_3px_0_var(--color-foreground)] border-2 border-foreground"
                  : "text-foreground/50 hover:text-foreground/70 border-2 border-transparent"
              }`}
            >
              <Icon size={14} />
              <span className="hidden sm:inline">{tabLabels[tab.labelKey]}</span>
              <span className="sm:hidden">{tab.sfx}</span>
            </button>
          );
        })}
      </motion.div>

      {activeTab === "services" || activeTab === "remote" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <ServiceGridCard service={service} />
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {jobs.map((job, i) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <JobGridCard job={job} />
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}
