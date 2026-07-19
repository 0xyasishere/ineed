"use client";

import { useI18n } from "@/lib/i18n";
import { PlusIcon } from "@/components/icons";
import { motion } from "framer-motion";
import { DataTable } from "@/components/ui/DataTable";
import { campaignColumns, type Campaign } from "@/lib/table-columns";

const campaigns: Campaign[] = [
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
          <PlusIcon size={16} />
          New Campaign
        </button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <DataTable
          columns={campaignColumns}
          data={campaigns}
          searchKey="name"
          searchPlaceholder="Search campaigns..."
          pageSize={10}
        />
      </motion.div>
    </div>
  );
}
