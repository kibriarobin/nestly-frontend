import { ROLE, type Role } from "@/constants/roles";

interface DemoAccount {
  role: Role;
  label: string;
  email: string;
  password: string;
}

export const DEMO_ACCOUNTS: DemoAccount[] = [
  { role: ROLE.ADMIN, label: "Admin", email: "robin@gmail.com", password: "robin12345" },
  { role: ROLE.OWNER, label: "Owner", email: "test@owner.com", password: "123456" },
  { role: ROLE.TENANT, label: "Tenant", email: "test@tenant.com", password: "123456" },
];