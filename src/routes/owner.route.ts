import { Building2, ClipboardList, UserCircle, Wallet } from "lucide-react";
import type { NavItem } from "@/types";

export const ownerRoutes: NavItem[] = [
  { title: "My Properties", href: "/owner", icon: Building2 },
  { title: "Applications", href: "/owner/applications", icon: ClipboardList },
  { title: "Earnings", href: "/owner/earnings", icon: Wallet },
  { title: "Profile", href: "/owner/profile", icon: UserCircle },
];
