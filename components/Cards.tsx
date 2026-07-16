"use client";

import { motion } from "framer-motion";
import {
  Star,
  Clock,
  ChevronRight,
  Briefcase,
  Users,
  BadgeCheck,
} from "lucide-react";
import type { Service, Job } from "@/types/service";

const categoryGradients: Record<string, string> = {
  "UI/UX Design": "from-pink-400 to-rose-500",
  "Web Development": "from-blue-500 to-indigo-600",
  Branding: "from-amber-400 to-orange-500",
  Copywriting: "from-emerald-400 to-teal-500",
  "Mobile Apps": "from-violet-500 to-purple-600",
  Marketing: "from-cyan-400 to-sky-500",
  "Content Writing": "from-emerald-400 to-teal-500",
  "Data Engineering": "from-violet-500 to-purple-600",
  DevOps: "from-cyan-400 to-sky-500",
};

export function ServiceGridCard({ service }: { service: Service }) {
  const gradient = categoryGradients[service.category] || "from-gray-400 to-gray-500";

  return (
    <motion.article
      whileHover={{ scale: 1.03, y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group flex flex-col overflow-hidden manga-panel bg-white cursor-pointer"
    >
      <div className={`relative aspect-[16/10] bg-gradient-to-br ${gradient} p-6 flex flex-col justify-end`}>
        <span className="absolute top-3 left-3 inline-flex items-center manga-outline-sm bg-white/20 backdrop-blur-sm px-3 py-1 text-[11px] font-bold text-white">
          {service.category}
        </span>
        <span className="absolute top-3 right-3 inline-flex items-center gap-1 manga-outline-sm bg-white/20 backdrop-blur-sm px-3 py-1 text-[11px] font-bold text-white">
          <Star size={10} fill="currentColor" /> {service.freelancer.rating}
        </span>
        <div className="relative z-10 flex items-center gap-1.5 text-[11px] font-bold text-white/80">
          <Clock size={10} />
          {service.deliveryDays} day delivery
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-sm font-bold leading-snug text-foreground line-clamp-2 group-hover:text-primary transition-colors duration-200">
          {service.title}
        </h3>
        <p className="mt-2 text-xs leading-relaxed text-foreground/65 line-clamp-2">
          {service.description}
        </p>

        <div className="mt-auto pt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center manga-outline-sm bg-primary/10 text-[10px] font-extrabold text-primary">
                {service.freelancer.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div>
                <p className="text-xs font-bold text-foreground">
                  {service.freelancer.name}
                </p>
                <p className="text-[10px] text-foreground/55">Seller</p>
              </div>
            </div>
            <span className="text-xl font-manga text-foreground tracking-wide" style={{ textShadow: "1px 1px 0 var(--color-primary)" }}>
              {service.currency}{service.price}
            </span>
          </div>
        </div>

        <button className="mt-4 w-full manga-outline-sm bg-muted py-3 text-xs font-bold text-primary transition-all duration-200 hover:bg-primary hover:text-white cursor-pointer flex items-center justify-center gap-1.5">
          View Details
          <ChevronRight size={12} />
        </button>
      </div>
    </motion.article>
  );
}

export function JobGridCard({ job }: { job: Job }) {
  const gradient = categoryGradients[job.category] || "from-gray-400 to-gray-500";

  return (
    <motion.article
      whileHover={{ scale: 1.03, y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group flex flex-col overflow-hidden manga-panel bg-white cursor-pointer"
    >
      <div className={`relative aspect-[16/10] bg-gradient-to-br ${gradient} p-6 flex flex-col justify-end`}>
        <span className="absolute top-3 left-3 inline-flex items-center manga-outline-sm bg-white/20 backdrop-blur-sm px-3 py-1 text-[11px] font-bold text-white">
          {job.category}
        </span>
        <span className="absolute top-3 right-3 inline-flex items-center gap-1 manga-outline-sm bg-accent/90 backdrop-blur-sm px-3 py-1 text-[11px] font-bold text-white">
          <BadgeCheck size={10} /> Open
        </span>
        <div className="relative z-10 flex items-center gap-2 text-[11px] font-bold text-white/80">
          <Clock size={10} />
          {job.postedAt}
          <span>·</span>
          <Users size={10} />
          {job.applicants}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-sm font-bold leading-snug text-foreground line-clamp-2 group-hover:text-primary transition-colors duration-200">
          {job.title}
        </h3>
        <p className="mt-2 text-xs leading-relaxed text-foreground/65 line-clamp-2">
          {job.description}
        </p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {job.tags.map((tag) => (
            <span
              key={tag}
              className="manga-outline-sm bg-muted px-2.5 py-1 text-[10px] font-bold text-primary/80"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-auto pt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Briefcase size={12} className="text-foreground/55" />
              <span className="text-xs font-bold text-foreground/60">
                {job.postedBy}
              </span>
            </div>
            <span className="text-xl font-manga text-foreground tracking-wide" style={{ textShadow: "1px 1px 0 var(--color-primary)" }}>
              {job.budget > 0 ? `${job.currency}${job.budget.toLocaleString()}` : "Paid"}
            </span>
          </div>
        </div>

        {job.url ? (
          <a
            href={job.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 w-full manga-outline-sm bg-primary py-3 text-xs font-bold text-white transition-all duration-200 hover:bg-primary/90 hover:shadow-[4px_4px_0_var(--color-foreground)] cursor-pointer flex items-center justify-center gap-1.5"
          >
            Apply Now ⚡
            <ChevronRight size={12} />
          </a>
        ) : (
          <button className="mt-4 w-full manga-outline-sm bg-primary py-3 text-xs font-bold text-white transition-all duration-200 hover:bg-primary/90 hover:shadow-[4px_4px_0_var(--color-foreground)] cursor-pointer flex items-center justify-center gap-1.5">
            Apply Now ⚡
            <ChevronRight size={12} />
          </button>
        )}
      </div>
    </motion.article>
  );
}
