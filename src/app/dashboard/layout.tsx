import type { ReactNode } from "react";
import { DashboardShell } from "@/components/layout";
import { ROLE } from "@/constants/roles";

export default function TenantLayout({ children }: { children: ReactNode }) {
  return <DashboardShell role={ROLE.TENANT}>{children}</DashboardShell>;
}