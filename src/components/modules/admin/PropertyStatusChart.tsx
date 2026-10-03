"use client";

import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { PROPERTY_STATUSES } from "@/constants/property";
import type { PropertyStatus } from "@/types";

const COLORS: Record<PropertyStatus, string> = {
  PENDING: "var(--warning)",
  APPROVED: "var(--success)",
  REJECTED: "var(--destructive)",
  SUSPENDED: "var(--muted-foreground)",
};

const label = (status: string) =>
  `${status.charAt(0)}${status.slice(1).toLowerCase()}`;

export default function PropertyStatusChart({
  counts,
}: {
  counts: Record<PropertyStatus, number>;
}) {
  const data = PROPERTY_STATUSES.map((status) => ({
    status,
    name: label(status),
    value: counts[status],
  })).filter((item) => item.value > 0);

  if (data.length === 0) {
    return (
      <p className="py-16 text-center text-sm text-muted-foreground">
        No properties to chart yet.
      </p>
    );
  }

  return (
    <div
      role="img"
      aria-label={`Properties by status: ${data
        .map((item) => `${item.name} ${item.value}`)
        .join(", ")}`}
      className="h-72 w-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={2}
          >
            {data.map((item) => (
              <Cell key={item.status} fill={COLORS[item.status]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              background: "var(--popover)",
              border: "1px solid var(--border)",
              borderRadius: 8,
              color: "var(--popover-foreground)",
            }}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
