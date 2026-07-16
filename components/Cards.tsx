"use client";

import { motion } from "framer-motion";
import type { Service, Job } from "@/types/service";
import { ExternalLinkIcon, StarIcon } from "@/components/icons";

const categoryIcons: Record<string, string> = {
  "UI/UX Design": "🎨",
  "Web Development": "💻",
  "Branding": "✨",
  "Copywriting": "✍️",
  "Mobile Apps": "📱",
  "Marketing": "📈",
  "Content Writing": "📝",
  "Data Engineering": "📊",
  "DevOps": "🔧",
};

export function ServiceGridCard({ service }: { service: Service }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      whileHover={{ scale: 1.03, y: -4, rotate: 0.5 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="group manga-panel bg-white p-5 cursor-pointer"
    >
      <div className="relative mb-4 overflow-hidden manga-outline bg-muted">
        <div className="flex h-40 items-center justify-center text-5xl">
          {categoryIcons[service.category] || "💼"}
        </div>
        <span className="absolute top-2 right-2 manga-outline-sm bg-primary px-2.5 py-0.5 font-manga text-[10px] text-white tracking-wide" style={{ textShadow: "1px 1px 0 rgba(0,0,0,0.3)" }}>
          ★
        </span>
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="absolute h-px bg-white/40"
                style={{
                  width: "140%",
                  top: "50%",
                  left: "-20%",
                  transform: `rotate(${i * 22.5}deg)`,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <h3 className="font-manga tracking-wide text-sm text-foreground group-hover:text-primary transition-colors" style={{ textShadow: "1px 1px 0 rgba(45,138,86,0.1)" }}>
        {service.title}
      </h3>
      <p className="mt-1.5 text-xs text-foreground/55 font-medium line-clamp-2 leading-relaxed">
        {service.description}
      </p>

      <div className="mt-3 flex items-center justify-between border-t-2 border-dashed border-foreground/10 pt-3">
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-bold text-foreground/55">by</span>
          <span className="text-xs font-bold text-foreground">{service.freelancer.name}</span>
        </div>
        <span className="manga-outline-sm bg-primary/10 px-2.5 py-0.5 text-xs font-bold text-primary">
          ${service.price}
        </span>
      </div>

      <div className="mt-2 flex items-center gap-1">
        <StarIcon size={10} className="fill-accent text-accent" />
        <span className="text-[10px] font-bold text-foreground/60">{service.freelancer.rating}</span>
        <span className="text-[10px] text-foreground/40">• {service.deliveryDays}d</span>
      </div>
    </motion.div>
  );
}

export function JobGridCard({ job }: { job: Job }) {
  const hostname = job.url ? new URL(job.url).hostname : null;

  return (
    <motion.a
      href={job.url || "#"}
      target={job.url ? "_blank" : undefined}
      rel={job.url ? "noopener noreferrer" : undefined}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      whileHover={{ scale: 1.03, y: -4, rotate: -0.5 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="group block manga-panel bg-white p-5 cursor-pointer"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg manga-outline bg-primary/10 text-xl font-manga text-primary" style={{ textShadow: "1px 1px 0 rgba(45,138,86,0.15)" }}>
          {job.postedBy?.[0] || "💼"}
        </div>
        {job.url && (
          <span className="manga-outline-sm bg-accent px-2.5 py-0.5 font-manga text-[10px] text-white tracking-wide" style={{ textShadow: "1px 1px 0 rgba(0,0,0,0.3)" }}>
            ★
          </span>
        )}
      </div>

      <h3 className="font-manga tracking-wide text-sm text-foreground group-hover:text-primary transition-colors" style={{ textShadow: "1px 1px 0 rgba(45,138,86,0.1)" }}>
        {job.title}
      </h3>
      <p className="mt-1 text-xs text-foreground/55 font-bold">{job.postedBy}</p>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {job.tags.slice(0, 3).map((tag) => (
          <span key={tag} className="manga-outline-sm bg-muted px-2 py-0.5 text-[10px] font-bold text-foreground/65">
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-3 border-t-2 border-dashed border-foreground/10 pt-3">
        <p className="text-xs text-foreground/55 font-medium line-clamp-2 leading-relaxed">
          {job.description}
        </p>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-[10px] text-foreground/55 font-bold">
          <span>⏱</span>
          <span>{job.postedAt}</span>
        </div>
        {hostname && (
          <div className="flex items-center gap-1 text-[10px] text-primary/60 font-bold">
            <ExternalLinkIcon size={10} />
            <span className="truncate max-w-[100px]">{hostname}</span>
          </div>
        )}
      </div>

      {job.url && (
        <motion.div
          className="mt-3 overflow-hidden manga-outline-sm bg-primary/10 py-2 text-center text-xs font-bold text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300"
          whileTap={{ scale: 0.95 }}
        >
          Apply Now →
        </motion.div>
      )}
    </motion.a>
  );
}
