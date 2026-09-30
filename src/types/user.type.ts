import type { Role } from "@/constants/roles";

export interface IUser {
  id: string;
  name: string;
  email: string;
  role: Role;
}