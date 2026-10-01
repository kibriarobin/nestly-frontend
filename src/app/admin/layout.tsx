import type { ReactNode } from "react";
import { DashboardShell } from "@/components/layout";
import { ROLE } from "@/constants/roles";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <DashboardShell role={ROLE.ADMIN}>{children}</DashboardShell>;
}