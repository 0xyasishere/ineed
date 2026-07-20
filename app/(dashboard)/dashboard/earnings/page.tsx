"use client";

import { useI18n } from "@/lib/i18n";
import { useAuth } from "@/lib/auth";
import { createClient } from "@/lib/supabase/client";
import { WalletIcon, ArrowUpRightIcon, ArrowDownRightIcon } from "@/components/icons";
import { motion } from "framer-motion";
import { DataTable } from "@/components/ui/DataTable";
import { transactionColumns, type Transaction } from "@/lib/table-columns";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { useState, useEffect } from "react";

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
  const { user } = useAuth();
  const supabase = createClient();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [totals, setTotals] = useState({ total: 0, thisMonth: 0, pending: 0 });
  const [monthlyData, setMonthlyData] = useState<Array<{ month: string; income: number; withdrawal: number }>>([]);
  const [weeklyData, setWeeklyData] = useState<Array<{ day: string; amount: number }>>([]);

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      const { data } = await supabase
        .from("transactions")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (data) {
        const txList: Transaction[] = data.map((tx: Record<string, unknown>) => ({
          id: tx.id as string,
          description: tx.description as string,
          amount: `${tx.type === "income" ? "+" : "-"}$${tx.amount}`,
          type: tx.type as "income" | "withdrawal",
          date: new Date(tx.created_at as string).toLocaleDateString("en", { day: "numeric", month: "short", year: "numeric" }),
        }));
        setTransactions(txList);

        const now = new Date();
        const thisMonth = data.filter((tx: Record<string, unknown>) => {
          const d = new Date(tx.created_at as string);
          return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
        });

        setTotals({
          total: data.filter((tx: Record<string, unknown>) => tx.type === "income").reduce((sum, tx) => sum + Number(tx.amount), 0),
          thisMonth: thisMonth.filter((tx: Record<string, unknown>) => tx.type === "income").reduce((sum, tx) => sum + Number(tx.amount), 0),
          pending: data.filter((tx: Record<string, unknown>) => tx.type === "income" && new Date(tx.created_at as string).getDate() > now.getDate() - 7).reduce((sum, tx) => sum + Number(tx.amount), 0),
        });

        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const monthly = months.map((month) => {
          const monthIdx = months.indexOf(month);
          const monthTx = data.filter((tx: Record<string, unknown>) => {
            const d = new Date(tx.created_at as string);
            return d.getMonth() === monthIdx && d.getFullYear() === now.getFullYear();
          });
          return {
            month,
            income: monthTx.filter((tx: Record<string, unknown>) => tx.type === "income").reduce((sum, tx) => sum + Number(tx.amount), 0),
            withdrawal: monthTx.filter((tx: Record<string, unknown>) => tx.type === "withdrawal").reduce((sum, tx) => sum + Number(tx.amount), 0),
          };
        });
        setMonthlyData(monthly);

        const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const weekly = days.map((day) => {
          const dayIdx = days.indexOf(day);
          const dayTx = data.filter((tx: Record<string, unknown>) => new Date(tx.created_at as string).getDay() === dayIdx);
          return { day, amount: dayTx.reduce((sum, tx) => sum + Number(tx.amount), 0) };
        });
        setWeeklyData(weekly);
      }
    };

    fetchData();
  }, [user]);

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <h1 className="text-2xl font-manga text-foreground">💰 {t.dashboard.earningsTitle}</h1>
        <p className="mt-1 text-sm text-foreground/50">{t.dashboard.earningsDesc}</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.3 }} className="manga-panel bg-white p-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100"><WalletIcon size={20} className="text-emerald-600" /></div>
          <p className="mt-4 text-2xl font-extrabold text-foreground">${totals.total.toLocaleString()}</p>
          <p className="mt-1 text-xs font-semibold text-foreground/50">{t.dashboard.totalEarnings}</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: 0.05 }} className="manga-panel bg-white p-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10"><ArrowUpRightIcon size={20} className="text-primary" /></div>
          <p className="mt-4 text-2xl font-extrabold text-foreground">${totals.thisMonth.toLocaleString()}</p>
          <p className="mt-1 text-xs font-semibold text-foreground/50">This Month</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: 0.1 }} className="manga-panel bg-white p-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100"><ArrowDownRightIcon size={20} className="text-amber-600" /></div>
          <p className="mt-4 text-2xl font-extrabold text-foreground">${totals.pending.toLocaleString()}</p>
          <p className="mt-1 text-xs font-semibold text-foreground/50">Pending</p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.1 }} className="lg:col-span-2 manga-panel bg-white p-5">
          <h3 className="text-sm font-manga tracking-wide text-foreground mb-4" style={{ textShadow: "1px 1px 0 rgba(45,138,86,0.1)" }}>Monthly Earnings</h3>
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

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.15 }} className="manga-panel bg-white p-5">
          <h3 className="text-sm font-manga tracking-wide text-foreground mb-4" style={{ textShadow: "1px 1px 0 rgba(45,138,86,0.1)" }}>This Week</h3>
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

      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.2 }}>
        <DataTable columns={transactionColumns} data={transactions} searchKey="description" searchPlaceholder="Search transactions..." pageSize={5} />
      </motion.div>
    </div>
  );
}
