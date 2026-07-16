"use client";

import { useI18n } from "@/lib/i18n";
import { Plus, Megaphone } from "lucide-react";
import { motion } from "framer-motion";

const campaigns = [
  { id: "1", name: "Spring Freelance Fest", discount: "20%", status: "active", startDate: "1 Jul", endDate: "31 Jul", views: 1240 },
  { id: "2", name: "New Seller Welcome", discount: "15%", status: "active", startDate: "1 Jun", endDate: "30 Jun", views: 890 },
  { id: "3", name: "Refer a Friend", discount: "$10", status: "ended", startDate: "1 May", endDate: "31 May", views: 2100 },
];

export default function CampaignsPage() {
  const { t } = useI18n();

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl font-manga text-foreground">📣 {t.dashboard.campaignsTitle}</h1>
          <p className="mt-1 text-sm text-foreground/50">{t.dashboard.campaignsDesc}</p>
        </div>
        <button className="inline-flex items-center gap-2 manga-outline-sm bg-primary px-5 py-3 text-sm font-bold text-white transition-all duration-200 hover:bg-primary/90 hover:shadow-lg cursor-pointer self-start">
          <Plus size={16} />
          New Campaign
        </button>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {campaigns.map((c, i) => (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            className="manga-panel bg-white p-5 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20 cursor-pointer"
          >
            <div className="flex items-start justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                <Megaphone size={20} className="text-primary" />
              </div>
              <span className={`inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
                c.status === "active" ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-500"
              }`}>
                {c.status}
              </span>
            </div>
            <h3 className="mt-4 text-sm font-bold text-foreground">{c.name}</h3>
            <p className="mt-1 text-xs text-foreground/50">{c.startDate} — {c.endDate}</p>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-lg font-extrabold text-primary">{c.discount} OFF</span>
              <span className="text-[11px] font-semibold text-foreground/40">{c.views} views</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
