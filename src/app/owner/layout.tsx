import type { ReactNode } from "react";
import { DashboardShell } from "@/components/layout";
import { ROLE } from "@/constants/roles";

export default function OwnerLayout({ children }: { children: ReactNode }) {
  return <DashboardShell role={ROLE.OWNER}>{children}</DashboardShell>;
}
