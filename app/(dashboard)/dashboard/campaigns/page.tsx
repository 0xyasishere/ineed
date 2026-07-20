"use client";

import { useI18n } from "@/lib/i18n";
import { useAuth } from "@/lib/auth";
import { createClient } from "@/lib/supabase/client";
import { PlusIcon } from "@/components/icons";
import { motion } from "framer-motion";
import { DataTable } from "@/components/ui/DataTable";
import { campaignColumns, type Campaign } from "@/lib/table-columns";
import { useState, useEffect } from "react";
import { toast } from "sonner";

export default function CampaignsPage() {
  const { t } = useI18n();
  const { user } = useAuth();
  const supabase = createClient();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  useEffect(() => {
    if (!user) return;

    const fetchCampaigns = async () => {
      const { data } = await supabase
        .from("campaigns")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (data) {
        setCampaigns(data.map((c: Record<string, unknown>) => ({
          id: c.id as string,
          name: c.name as string,
          discount: c.discount as string,
          status: (c.status === "active" ? "active" : "ended") as "active" | "ended",
          startDate: c.start_date ? new Date(c.start_date as string).toLocaleDateString("en", { day: "numeric", month: "short" }) : "-",
          endDate: c.end_date ? new Date(c.end_date as string).toLocaleDateString("en", { day: "numeric", month: "short" }) : "-",
          views: c.views as number,
        })));
      }
    };

    fetchCampaigns();
  }, [user]);

  const handleNewCampaign = () => {
    toast.info("Campaign creation coming soon!");
  };

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
        <button
          onClick={handleNewCampaign}
          className="inline-flex items-center gap-2 manga-outline-sm bg-primary px-5 py-3 text-sm font-bold text-white transition-all duration-200 hover:bg-primary/90 hover:shadow-lg cursor-pointer self-start"
        >
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
