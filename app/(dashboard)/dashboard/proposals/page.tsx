"use client";

import { useI18n } from "@/lib/i18n";
import { motion } from "framer-motion";
import { DataTable } from "@/components/ui/DataTable";
import { proposalColumns, type Proposal } from "@/lib/table-columns";

const proposals: Proposal[] = [
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
