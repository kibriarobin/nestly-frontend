import apiClient from "@/lib/clientApi";
import type { ApiResponse } from "@/types";
import type {
  LoginPayload,
  LoginResponse,
  RegistrationPayload,
  UpdateProfilePayload,
  UserProfileResponse,
} from "@/types/auth.type";

export function userRegistration(payload: RegistrationPayload) {
  return apiClient<ApiResponse<unknown>>("/auth/register", {
    method: "POST",
    body: payload,
  });
}

export function userLogin(payload: LoginPayload): Promise<LoginResponse> {
  return apiClient("/auth/login", {
    method: "POST",
    body: payload,
  });
}

export function userLogout() {
  return apiClient<ApiResponse<null>>("/auth/logout", {
    method: "POST",
  });
}

export function getUserProfile(): Promise<UserProfileResponse> {
  return apiClient("/users/me");
}

export function updateUserProfile(
  payload: UpdateProfilePayload,
): Promise<UserProfileResponse> {
  return apiClient("/users/me", { method: "PATCH", body: payload });
}