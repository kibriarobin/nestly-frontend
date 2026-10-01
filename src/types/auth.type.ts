import type { ApiResponse } from "./api.type";
import type { IUser } from "./user.type";

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegistrationPayload {
  name: string;
  email: string;
  password: string;
  role: "OWNER" | "TENANT";
  phone?: string;
}

export interface LoginData {
  user: IUser;
  tokens: AuthTokens;
}

export type LoginResponse = ApiResponse<LoginData>;
export type UserProfileResponse = ApiResponse<IUser>;