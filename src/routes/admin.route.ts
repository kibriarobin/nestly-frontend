import { FileText, LayoutDashboard, Users } from "lucide-react";
import type { NavItem } from "@/types";

export const adminRoutes: NavItem[] = [
  { title: "Overview", href: "/admin", icon: LayoutDashboard },
  { title: "Manage", href: "/admin/manage", icon: Users },
  { title: "Reports", href: "/admin/reports", icon: FileText },
];
