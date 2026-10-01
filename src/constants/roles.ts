export const ROLE = {
  ADMIN: "ADMIN",
  OWNER: "OWNER",
  TENANT: "TENANT",
} as const;

export type Role = (typeof ROLE)[keyof typeof ROLE];

export const ROLE_DASHBOARD: Record<Role, string> = {
  ADMIN: "/admin",
  OWNER: "/owner",
  TENANT: "/dashboard",
};