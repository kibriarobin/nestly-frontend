import type { Role } from "@/constants/roles";

export type UserStatus = "ACTIVE" | "BLOCKED" | "DELETED";

export type AuthProvider = "LOCAL" | "GOOGLE";

export interface IUser {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  role: Role;
  authProvider: AuthProvider;
  status: UserStatus;
  image: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}
