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
import type { IOwnerStat } from "@/types";

const TOP = 6;

export default function OwnerStatsChart({ owners }: { owners: IOwnerStat[] }) {
  const data = [...owners]
    .sort((a, b) => b.propertyCount - a.propertyCount)
    .slice(0, TOP)
    .map((owner) => ({ name: owner.name, count: owner.propertyCount }));

  if (data.length === 0) {
    return (
      <p className="py-16 text-center text-sm text-muted-foreground">
        No owners yet.
      </p>
    );
  }

  return (
    <div
      role="img"
      aria-label={`Properties per owner: ${data
        .map((item) => `${item.name} ${item.count}`)
        .join(", ")}`}
      className="h-72 w-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 8, right: 16, left: 8, bottom: 0 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="var(--border)"
            horizontal={false}
          />
          <XAxis
            type="number"
            allowDecimals={false}
            stroke="var(--muted-foreground)"
            tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
          />
          <YAxis
            type="category"
            dataKey="name"
            width={96}
            stroke="var(--muted-foreground)"
            tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
            tickLine={false}
          />
          <Tooltip
            cursor={{ fill: "var(--muted)" }}
            formatter={(value) => [String(value), "Properties"]}
            contentStyle={{
              background: "var(--popover)",
              border: "1px solid var(--border)",
              borderRadius: 8,
              color: "var(--popover-foreground)",
            }}
          />
          <Bar dataKey="count" fill="var(--chart-2)" radius={[0, 6, 6, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
