import type { Role } from "@/constants/roles";

export type AdminUserStatus = "ACTIVE" | "BLOCKED";

export type AuditAction =
  | "CREATE"
  | "UPDATE"
  | "DELETE"
  | "APPROVE"
  | "REJECT"
  | "BLOCK"
  | "UNBLOCK"
  | "LOGIN"
  | "PAYMENT";

export interface IAdminUser {
  id: string;
  name: string;
  email: string;
  role: Role;
  status: string;
  phone: string | null;
  createdAt: string;
}

export interface IAuditLog {
  id: string;
  action: AuditAction;
  entity: string;
  entityId: string;
  description: string | null;
  createdAt: string;
  user: { id: string; name: string; email: string; role: Role } | null;
}

export interface IDashboardStats {
  users: { total: number; owners: number; tenants: number };
  properties: { total: number; approved: number; pending: number };
  flats: number;
  rooms: number;
  bookings: { active: number; completed: number };
  revenue: string | number;
}

export interface IOwnerStat {
  ownerId: string;
  name: string;
  email: string;
  propertyCount: number;
}

export interface IAdminUserQuery {
  role?: string;
  status?: string;
  searchTerm?: string;
  page?: number;
  limit?: number;
}

export interface IAuditLogQuery {
  page?: number;
  limit?: number;
}
