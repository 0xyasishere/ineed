"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ServiceGridCard, JobGridCard } from "@/components/Cards";
import type { Service, Job } from "@/types/service";
import { createClient } from "@/lib/supabase/client";
import { SparkleIcon, BriefcaseIcon, RemoteIcon, SearchIcon, FilterIcon } from "@/components/icons";
import { useI18n } from "@/lib/i18n";

const fallbackServices: Service[] = [
  { id: "s1", title: "I will design a modern SaaS landing page", description: "Clean, conversion-focused landing page design with Figma source files and responsive layouts.", price: 150, currency: "$", category: "UI/UX Design", freelancer: { name: "Sarah Chen", avatar: "", rating: 4.9 }, image: "", deliveryDays: 5 },
  { id: "s2", title: "I will build a full-stack Next.js application", description: "Production-ready web app with auth, database, API routes, and deployment setup included.", price: 499, currency: "$", category: "Web Development", freelancer: { name: "Marcus Rivera", avatar: "", rating: 4.8 }, image: "", deliveryDays: 14 },
  { id: "s3", title: "I will create your brand identity package", description: "Complete brand kit — logo, color palette, typography guide, and social media templates.", price: 275, currency: "$", category: "Branding", freelancer: { name: "Aisha Patel", avatar: "", rating: 5.0 }, image: "", deliveryDays: 7 },
  { id: "s4", title: "I will write high-converting email sequences", description: "5-email nurture sequence optimized for engagement and sales. Includes A/B subject lines.", price: 89, currency: "$", category: "Copywriting", freelancer: { name: "Elena Volkov", avatar: "", rating: 4.7 }, image: "", deliveryDays: 3 },
  { id: "s5", title: "I will develop a React Native mobile app", description: "Cross-platform iOS & Android app with clean architecture, testing, and App Store submission.", price: 799, currency: "$", category: "Mobile Apps", freelancer: { name: "David Kim", avatar: "", rating: 4.9 }, image: "", deliveryDays: 21 },
  { id: "s6", title: "I will set up your Google Ads campaign", description: "Full campaign setup with keyword research, ad copy, bidding strategy, and weekly reporting.", price: 200, currency: "$", category: "Marketing", freelancer: { name: "James O'Connor", avatar: "", rating: 4.6 }, image: "", deliveryDays: 5 },
];

const fallbackJobs: Job[] = [
  { id: "j1", title: "React Developer for E-commerce Platform", description: "Need an experienced React developer to build a modern e-commerce storefront with Stripe integration.", budget: 2500, currency: "$", category: "Web Development", postedBy: "TechCorp Inc.", postedAt: "2 hours ago", applicants: 12, image: "", tags: ["React", "TypeScript", "Stripe"] },
  { id: "j2", title: "Mobile App UI/UX Redesign", description: "Looking for a designer to completely revamp our existing fintech app. Must have portfolio.", budget: 1800, currency: "$", category: "UI/UX Design", postedBy: "Finova Labs", postedAt: "5 hours ago", applicants: 8, image: "", tags: ["Figma", "Mobile", "Fintech"] },
  { id: "j3", title: "Content Writer for SaaS Blog", description: "We need a skilled writer for weekly technical blog posts about cloud infrastructure and DevOps.", budget: 800, currency: "$", category: "Content Writing", postedBy: "CloudStack", postedAt: "1 day ago", applicants: 23, image: "", tags: ["Blog", "SaaS", "Technical"] },
  { id: "j4", title: "Python Data Pipeline Engineer", description: "Build an automated ETL pipeline using Python, Airflow, and BigQuery. Ongoing project.", budget: 3200, currency: "$", category: "Data Engineering", postedBy: "DataVerse", postedAt: "3 hours ago", applicants: 6, image: "", tags: ["Python", "Airflow", "BigQuery"] },
  { id: "j5", title: "Brand Identity for AI Startup", description: "Startup seeking a creative designer for full brand identity — logo, guidelines, pitch deck design.", budget: 1200, currency: "$", category: "Branding", postedBy: "NeuralPath AI", postedAt: "12 hours ago", applicants: 15, image: "", tags: ["Logo", "Identity", "Startup"] },
  { id: "j6", title: "DevOps AWS Infrastructure Setup", description: "Configure production AWS infrastructure with Terraform, CI/CD pipelines, and monitoring.", budget: 4000, currency: "$", category: "DevOps", postedBy: "ScaleUp.io", postedAt: "6 hours ago", applicants: 4, image: "", tags: ["AWS", "Terraform", "CI/CD"] },
];

const remoteJobs: Job[] = [
  { id: "r1", title: "Ambassador", description: "Join qLABS Ambassador Program. Create content, drive conversations around quantum security, and support daily community culture across X, Discord, and Telegram. Earn $50-200/month in $qONE.", budget: 50, currency: "$", category: "Ambassador", postedBy: "qLABS", postedAt: "Just now", applicants: 0, image: "", tags: ["Web3", "Ambassador", "Remote"], url: "https://docs.google.com/forms/d/e/1FAIpQLScwLzOiufq925Oq2y6NAqA2FMoukkopJgmcPt1huQy7_4rFKQ/viewform" },
  { id: "r2", title: "Community Manager", description: "Join Colonist as Community Manager. Build and engage the community, manage social channels, and drive growth for the platform.", budget: 0, currency: "$", category: "Community", postedBy: "Colonist", postedAt: "Just now", applicants: 0, image: "", tags: ["Gaming", "Community", "Remote"], url: "https://jobs.ashbyhq.com/colonist/2ec0bf9a-9e89-4f76-b527-c10f8d5c3a11" },
  { id: "r3", title: "Support Manager", description: "Join Flipper Devices as Support Manager. Help users worldwide with device support, manage tickets, and improve customer experience.", budget: 0, currency: "$", category: "Support", postedBy: "Flipper Devices", postedAt: "Just now", applicants: 0, image: "", tags: ["Hardware", "Support", "Remote"], url: "https://flipperdevices.com/jobs/?ashby_jid=1730954b-ba77-4416-bbd9-5757825891d7" },
  { id: "r4", title: "Discord Moderator", description: "Moderate Holvia's official Discord server. Keep discussions organized, welcome newcomers, and support the Web3 community.", budget: 0, currency: "$", category: "Community", postedBy: "Holvia", postedAt: "Just now", applicants: 0, image: "", tags: ["Web3", "Discord", "Moderation"], url: "https://www.holvia.xyz/career/roles/discord-moderator" },
  { id: "r5", title: "Country Community MOD", description: "Help AllScale grow local communities and expand awareness for stablecoin payment products. Manage community conversations and identify business opportunities.", budget: 0, currency: "$", category: "Community", postedBy: "AllScale (YZi Labs)", postedAt: "Just now", applicants: 0, image: "", tags: ["Web3", "Stablecoin", "Community"], url: "https://talent.yzilabs.com/jobs/1b5aaa61-0ffb-4fc4-9e2c-46d9c746a9a0" },
];

const tabs = [
  { id: "services" as const, labelKey: "services", icon: SparkleIcon, sfx: "✨" },
  { id: "jobs" as const, labelKey: "jobs", icon: BriefcaseIcon, sfx: "💼" },
  { id: "remote" as const, labelKey: "remote", icon: RemoteIcon, sfx: "🌀" },
];

const allCategories = [
  "All", "Web Development", "UI/UX Design", "Branding", "Copywriting",
  "Marketing", "Mobile Apps", "Data Engineering", "DevOps", "Content Writing",
  "Community", "Support", "Ambassador",
];

function matchesSearch(item: { title: string; description: string; category: string; tags?: string[] }, query: string): boolean {
  if (!query) return true;
  const q = query.toLowerCase();
  return (
    item.title.toLowerCase().includes(q) ||
    item.description.toLowerCase().includes(q) ||
    item.category.toLowerCase().includes(q) ||
    (item.tags || []).some((t) => t.toLowerCase().includes(q))
  );
}

export function ContentTabs() {
  const [activeTab, setActiveTab] = useState<"services" | "jobs" | "remote">("services");
  const [services, setServices] = useState<Service[]>(fallbackServices);
  const [jobs, setJobs] = useState<Job[]>(fallbackJobs);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  const { t } = useI18n();
  const supabase = createClient();

  useEffect(() => {
    const fetchData = async () => {
      const { data: servicesData } = await supabase
        .from("services")
        .select("*, profiles(name)")
        .eq("status", "active")
        .order("created_at", { ascending: false })
        .limit(8);

      if (servicesData && servicesData.length > 0) {
        const mapped: Service[] = servicesData.map((s: Record<string, unknown>) => ({
          id: s.id as string,
          title: s.title as string,
          description: s.description as string,
          price: s.price as number,
          currency: "$",
          category: s.category as string,
          freelancer: {
            name: (s.profiles as Record<string, unknown>)?.name as string || "Anonymous",
            avatar: "",
            rating: 4.8,
          },
          image: "",
          deliveryDays: s.delivery_days as number,
        }));
        setServices(mapped);
      }

      const { data: jobsData } = await supabase
        .from("jobs")
        .select("*, profiles(name)")
        .eq("status", "active")
        .order("created_at", { ascending: false })
        .limit(8);

      if (jobsData && jobsData.length > 0) {
        const mapped: Job[] = jobsData.map((j: Record<string, unknown>) => ({
          id: j.id as string,
          title: j.title as string,
          description: j.description as string,
          budget: j.budget as number,
          currency: "$",
          category: j.category as string,
          postedBy: (j.profiles as Record<string, unknown>)?.name as string || "Anonymous",
          postedAt: new Date(j.created_at as string).toLocaleDateString(),
          applicants: 0,
          image: "",
          tags: (j.tags as string[]) || [],
          url: j.url as string || undefined,
        }));
        setJobs(mapped);
      }
    };

    fetchData();
  }, []);

  const filteredServices = useMemo(
    () => services.filter((s) => matchesSearch(s, searchQuery) && (selectedCategory === "All" || s.category === selectedCategory)),
    [services, searchQuery, selectedCategory]
  );

  const filteredJobs = useMemo(
    () => jobs.filter((j) => matchesSearch(j, searchQuery) && (selectedCategory === "All" || j.category === selectedCategory)),
    [jobs, searchQuery, selectedCategory]
  );

  const filteredRemote = useMemo(
    () => remoteJobs.filter((j) => matchesSearch(j, searchQuery) && (selectedCategory === "All" || j.category === selectedCategory)),
    [remoteJobs, searchQuery, selectedCategory]
  );

  const tabLabels: Record<string, string> = {
    services: t.tabs.services,
    jobs: t.tabs.jobs,
    remote: t.tabs.remote || "Remote Jobs",
  };

  const currentItems = activeTab === "services" ? filteredServices : activeTab === "jobs" ? filteredJobs : filteredRemote;

  return (
    <section id="services" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex items-center gap-1 manga-outline bg-muted p-1.5 max-w-lg mx-auto mb-8"
      >
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setSelectedCategory("All"); }}
              className={`flex-1 flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-bold transition-all duration-200 cursor-pointer ${
                activeTab === tab.id
                  ? "bg-white text-primary shadow-[3px_3px_0_var(--color-primary)] border-2 border-foreground"
                  : "text-foreground/65 hover:text-foreground/70 border-2 border-transparent"
              }`}
            >
              <Icon size={14} />
              <span className="hidden sm:inline">{tabLabels[tab.labelKey]}</span>
              <span className="sm:hidden">{tab.sfx}</span>
            </button>
          );
        })}
      </motion.div>

      {/* Search + Filter */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-2xl mx-auto mb-8"
      >
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <SearchIcon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/30" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.search?.placeholder || "Search services, jobs, categories..."}
              className="w-full manga-outline bg-white pl-9 pr-4 py-2.5 text-sm text-foreground outline-none transition-all focus:border-primary focus:shadow-[3px_3px_0_var(--color-primary)]"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`manga-outline-sm px-3 py-2.5 transition-all cursor-pointer ${showFilters ? "bg-primary text-white border-foreground" : "bg-white text-foreground/50 hover:text-foreground/70"}`}
          >
            <FilterIcon size={16} />
          </button>
        </div>

        {/* Category pills */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="flex flex-wrap gap-2 mt-3">
                {allCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`text-xs font-bold px-3 py-1.5 border-2 transition-all cursor-pointer ${
                      selectedCategory === cat
                        ? "bg-primary text-white border-foreground shadow-[2px_2px_0_var(--color-foreground)]"
                        : "bg-white text-foreground/50 border-foreground/20 hover:border-foreground/40"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Results */}
      {currentItems.length === 0 ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
          <p className="text-4xl mb-3">🔍</p>
          <p className="font-manga text-lg text-foreground/50">{t.search?.noResults || "No results found"}</p>
          <p className="text-sm text-foreground/30 mt-1">{t.search?.tryDifferent || "Try a different search or category"}</p>
        </motion.div>
      ) : activeTab === "services" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredServices.map((service, i) => (
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
      ) : activeTab === "remote" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredRemote.map((job, i) => (
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
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredJobs.map((job, i) => (
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
