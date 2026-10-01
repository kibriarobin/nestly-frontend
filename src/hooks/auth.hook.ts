import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getUserProfile,
  userLogin,
  userLogout,
  userRegistration,
} from "@/api";
import type { UserProfileResponse } from "@/types/auth.type";

export const USER_KEY = ["user"] as const;

export function useRegistration() {
  return useMutation({ mutationFn: userRegistration });
}

export function useLogin() {
  return useMutation({ mutationFn: userLogin });
}

export function useLogout() {
  return useMutation({ mutationFn: userLogout });
}

export function useGetMe() {
  return useQuery<UserProfileResponse>({
    queryKey: USER_KEY,
    queryFn: getUserProfile,
    retry: false,
  });
}