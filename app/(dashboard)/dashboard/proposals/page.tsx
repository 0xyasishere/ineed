"use client";

import { useI18n } from "@/lib/i18n";
import { useAuth } from "@/lib/auth";
import { createClient } from "@/lib/supabase/client";
import { motion } from "framer-motion";
import { DataTable } from "@/components/ui/DataTable";
import { proposalColumns, type Proposal } from "@/lib/table-columns";
import { useState, useEffect } from "react";

export default function ProposalsPage() {
  const { t } = useI18n();
  const { user } = useAuth();
  const supabase = createClient();
  const [proposals, setProposals] = useState<Proposal[]>([]);

  useEffect(() => {
    if (!user) return;

    const fetchProposals = async () => {
      const { data } = await supabase
        .from("proposals")
        .select("*, jobs(title, budget)")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (data) {
        setProposals(data.map((p: Record<string, unknown>) => ({
          id: p.id as string,
          project: (p.jobs as Record<string, unknown>)?.title as string || "Unknown Job",
          client: "You",
          budget: `$${(p.jobs as Record<string, unknown>)?.budget || p.bid_amount}`,
          status: (["pending", "accepted", "rejected"].includes(p.status as string) ? p.status : "pending") as "pending" | "accepted" | "rejected",
          date: new Date(p.created_at as string).toLocaleDateString(),
        })));
      }
    };

    fetchProposals();
  }, [user]);

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
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <DataTable
          columns={proposalColumns}
          data={proposals}
          searchKey="project"
          searchPlaceholder="Search proposals..."
          pageSize={10}
        />
      </motion.div>
    </div>
  );
}
