import { CreditCard, LayoutDashboard, UserCircle } from "lucide-react";
import type { NavItem } from "@/types";

export const tenantRoutes: NavItem[] = [
  { title: "My Activity", href: "/dashboard", icon: LayoutDashboard },
  { title: "Payments", href: "/dashboard/payments", icon: CreditCard },
  { title: "Profile", href: "/dashboard/profile", icon: UserCircle },
];