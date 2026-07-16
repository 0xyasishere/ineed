"use client";

import { useI18n } from "@/lib/i18n";
import { SearchIcon, FilterIcon } from "@/components/icons";
import { motion } from "framer-motion";

const proposals = [
  { id: "1", project: "React Developer for E-commerce", client: "TechCorp Inc.", budget: "$2,500", status: "pending", date: "2 jam lalu" },
  { id: "2", project: "Mobile App UI/UX Redesign", client: "Finova Labs", budget: "$1,800", status: "accepted", date: "5 jam lalu" },
  { id: "3", project: "Content Writer for SaaS Blog", client: "CloudStack", budget: "$800", status: "rejected", date: "1 hari lalu" },
  { id: "4", project: "Python Data Pipeline Engineer", client: "DataVerse", budget: "$3,200", status: "pending", date: "3 jam lalu" },
];

export default function ProposalsPage() {
  const { t } = useI18n();

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-2xl font-manga text-foreground">📝 {t.dashboard.proposalsTitle}</h1>
        <p className="mt-1 text-sm text-foreground/50">{t.dashboard.proposalsDesc}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="flex items-center gap-3"
      >
        <div className="flex-1 flex items-center gap-2 manga-outline bg-white px-4 py-2.5">
          <SearchIcon size={16} className="text-foreground/40" />
          <input type="text" placeholder={t.dashboard.searchPlaceholder} className="flex-1 bg-transparent text-sm text-foreground placeholder-foreground/40 outline-none" />
        </div>
        <button className="inline-flex items-center gap-2 manga-outline bg-white px-4 py-2.5 text-sm font-semibold text-foreground/60 transition-colors hover:bg-muted cursor-pointer">
          <FilterIcon size={14} />
          Filter
        </button>
      </motion.div>

      <div className="space-y-3">
        {proposals.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            className="manga-panel bg-white p-5 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20 cursor-pointer"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <h3 className="text-sm font-bold text-foreground">{p.project}</h3>
                <p className="mt-1 text-xs text-foreground/50">{p.client} · {p.date}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-lg font-extrabold text-foreground">{p.budget}</span>
                <span className={`inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
                  p.status === "accepted" ? "bg-emerald-100 text-emerald-700" :
                  p.status === "pending" ? "bg-amber-100 text-amber-700" :
                  "bg-red-100 text-red-700"
                }`}>
                  {p.status}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
