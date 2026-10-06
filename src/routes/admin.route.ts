import { Building2, FileText, LayoutDashboard, Users } from "lucide-react";
import type { NavItem } from "@/types";

export const adminRoutes: NavItem[] = [
  { title: "Overview", href: "/admin", icon: LayoutDashboard },
  { title: "Properties", href: "/admin/manage", icon: Building2 },
  { title: "Users", href: "/admin/users", icon: Users },
  { title: "Reports", href: "/admin/reports", icon: FileText },
];
