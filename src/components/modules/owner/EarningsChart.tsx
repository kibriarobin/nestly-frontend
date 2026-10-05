"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { MonthlyEarning } from "@/utils";
import { formatMoney } from "@/utils";

const compact = new Intl.NumberFormat("en", { notation: "compact" });

export default function EarningsChart({ data }: { data: MonthlyEarning[] }) {
  const total = data.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div
      role="img"
      aria-label={`Earnings per month, total ${formatMoney(total)}`}
      className="h-72 w-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="var(--border)"
            vertical={false}
          />
          <XAxis
            dataKey="label"
            stroke="var(--muted-foreground)"
            tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
            tickLine={false}
          />
          <YAxis
            stroke="var(--muted-foreground)"
            tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value: number) => compact.format(value)}
          />
          <Tooltip
            cursor={{ fill: "var(--muted)" }}
            formatter={(value) => [formatMoney(Number(value)), "Earned"]}
            contentStyle={{
              background: "var(--popover)",
              border: "1px solid var(--border)",
              borderRadius: 8,
              color: "var(--popover-foreground)",
            }}
          />
          <Bar dataKey="amount" fill="var(--primary)" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
