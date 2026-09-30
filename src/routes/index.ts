import { ROLE, type Role } from "@/constants/roles";
import type { NavItem } from "@/types";
import { adminRoutes } from "./admin.route";
import { ownerRoutes } from "./owner.route";
import { tenantRoutes } from "./tenant.route";

export const roleRoutes: Record<Role, NavItem[]> = {
  [ROLE.ADMIN]: adminRoutes,
  [ROLE.OWNER]: ownerRoutes,
  [ROLE.TENANT]: tenantRoutes,
};

export { adminRoutes, ownerRoutes, tenantRoutes };