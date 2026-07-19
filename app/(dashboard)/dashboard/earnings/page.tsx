"use client";

import { useI18n } from "@/lib/i18n";
import { WalletIcon, ArrowUpRightIcon, ArrowDownRightIcon } from "@/components/icons";
import { motion } from "framer-motion";
import { DataTable } from "@/components/ui/DataTable";
import { transactionColumns, type Transaction } from "@/lib/table-columns";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const transactions: Transaction[] = [
  { id: "1", description: "Payment from TechCorp Inc.", amount: "+$500", type: "income", date: "16 Jul 2026" },
  { id: "2", description: "Withdrawal to Bank ****1234", amount: "-$200", type: "withdrawal", date: "15 Jul 2026" },
  { id: "3", description: "Payment from Finova Labs", amount: "+$1,200", type: "income", date: "14 Jul 2026" },
  { id: "4", description: "Payment from CloudStack", amount: "+$800", type: "income", date: "12 Jul 2026" },
];

const monthlyData = [
  { month: "Jan", income: 1200, withdrawal: 400 },
  { month: "Feb", income: 800, withdrawal: 200 },
  { month: "Mar", income: 2100, withdrawal: 600 },
  { month: "Apr", income: 1600, withdrawal: 300 },
  { month: "May", income: 2800, withdrawal: 500 },
  { month: "Jun", income: 3200, withdrawal: 700 },
  { month: "Jul", income: 3800, withdrawal: 480 },
];

const weeklyData = [
  { day: "Mon", amount: 200 },
  { day: "Tue", amount: 450 },
  { day: "Wed", amount: 180 },
  { day: "Thu", amount: 620 },
  { day: "Fri", amount: 380 },
  { day: "Sat", amount: 150 },
  { day: "Sun", amount: 80 },
];

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; name: string }>; label?: string }) => {
  if (!active || !payload) return null;
  return (
    <div className="manga-outline-sm bg-white px-3 py-2 text-xs">
      <p className="font-bold text-foreground mb-1">{label}</p>
      {payload.map((entry) => (
        <p key={entry.name} className="text-foreground/60">
          {entry.name}: <span className="font-bold text-foreground">${entry.value}</span>
        </p>
      ))}
    </div>
  );
};

export default function EarningsPage() {
  const { t } = useI18n();

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-2xl font-manga text-foreground">💰 {t.dashboard.earningsTitle}</h1>
        <p className="mt-1 text-sm text-foreground/50">{t.dashboard.earningsDesc}</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="manga-panel bg-white p-5"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100">
            <WalletIcon size={20} className="text-emerald-600" />
          </div>
          <p className="mt-4 text-2xl font-extrabold text-foreground">$4,280</p>
          <p className="mt-1 text-xs font-semibold text-foreground/50">{t.dashboard.totalEarnings}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.05 }}
          className="manga-panel bg-white p-5"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
            <ArrowUpRightIcon size={20} className="text-primary" />
          </div>
          <p className="mt-4 text-2xl font-extrabold text-foreground">$3,800</p>
          <p className="mt-1 text-xs font-semibold text-foreground/50">This Month</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="manga-panel bg-white p-5"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100">
            <ArrowDownRightIcon size={20} className="text-amber-600" />
          </div>
          <p className="mt-4 text-2xl font-extrabold text-foreground">$480</p>
          <p className="mt-1 text-xs font-semibold text-foreground/50">Pending</p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="lg:col-span-2 manga-panel bg-white p-5"
        >
          <h3 className="text-sm font-manga tracking-wide text-foreground mb-4" style={{ textShadow: "1px 1px 0 rgba(45,138,86,0.1)" }}>
            Monthly Earnings
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "rgba(0,0,0,0.4)" }} />
                <YAxis tick={{ fontSize: 11, fill: "rgba(0,0,0,0.4)" }} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="income" name="Income" stroke="var(--color-primary)" strokeWidth={2} fill="url(#colorIncome)" />
                <Area type="monotone" dataKey="withdrawal" name="Withdrawal" stroke="#f59e0b" strokeWidth={2} fill="rgba(245,158,11,0.05)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="manga-panel bg-white p-5"
        >
          <h3 className="text-sm font-manga tracking-wide text-foreground mb-4" style={{ textShadow: "1px 1px 0 rgba(45,138,86,0.1)" }}>
            This Week
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: "rgba(0,0,0,0.4)" }} />
                <YAxis tick={{ fontSize: 11, fill: "rgba(0,0,0,0.4)" }} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="amount" name="Earnings" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <DataTable
          columns={transactionColumns}
          data={transactions}
          searchKey="description"
          searchPlaceholder="Search transactions..."
          pageSize={5}
        />
      </motion.div>
    </div>
  );
}
