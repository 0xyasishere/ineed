"use client";

import { useI18n } from "@/lib/i18n";
import { Wallet, ArrowUpRight, ArrowDownRight } from "lucide-react";

const transactions = [
  { id: "1", description: "Payment from TechCorp Inc.", amount: "+$500", type: "income", date: "16 Jul 2026" },
  { id: "2", description: "Withdrawal to Bank ****1234", amount: "-$200", type: "withdrawal", date: "15 Jul 2026" },
  { id: "3", description: "Payment from Finova Labs", amount: "+$1,200", type: "income", date: "14 Jul 2026" },
  { id: "4", description: "Payment from CloudStack", amount: "+$800", type: "income", date: "12 Jul 2026" },
];

export default function EarningsPage() {
  const { t } = useI18n();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-foreground">{t.dashboard.earningsTitle}</h1>
        <p className="mt-1 text-sm text-foreground/50">{t.dashboard.earningsDesc}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-2xl bg-white border border-border p-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100">
            <Wallet size={20} className="text-emerald-600" />
          </div>
          <p className="mt-4 text-2xl font-extrabold text-foreground">$4,280</p>
          <p className="mt-1 text-xs font-semibold text-foreground/50">{t.dashboard.totalEarnings}</p>
        </div>
        <div className="rounded-2xl bg-white border border-border p-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
            <ArrowUpRight size={20} className="text-primary" />
          </div>
          <p className="mt-4 text-2xl font-extrabold text-foreground">$3,800</p>
          <p className="mt-1 text-xs font-semibold text-foreground/50">This Month</p>
        </div>
        <div className="rounded-2xl bg-white border border-border p-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100">
            <ArrowDownRight size={20} className="text-amber-600" />
          </div>
          <p className="mt-4 text-2xl font-extrabold text-foreground">$480</p>
          <p className="mt-1 text-xs font-semibold text-foreground/50">Pending</p>
        </div>
      </div>

      <div className="rounded-2xl bg-white border border-border overflow-hidden">
        <div className="px-5 py-4 border-b border-border">
          <h3 className="text-sm font-extrabold text-foreground">Recent Transactions</h3>
        </div>
        {transactions.map((tx) => (
          <div key={tx.id} className="flex items-center justify-between px-5 py-4 border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
            <div>
              <p className="text-sm font-bold text-foreground">{tx.description}</p>
              <p className="mt-0.5 text-[11px] text-foreground/40">{tx.date}</p>
            </div>
            <span className={`text-sm font-extrabold ${tx.type === "income" ? "text-emerald-600" : "text-foreground/60"}`}>
              {tx.amount}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
