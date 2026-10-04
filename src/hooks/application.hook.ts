import { useMutation, useQuery } from "@tanstack/react-query";
import {
  approveApplication,
  getOwnerApplications,
  rejectApplication,
} from "@/api";

export const APPLICATION_KEYS = {
  owner: ["applications", "owner"] as const,
};

export function useOwnerApplications() {
  return useQuery({
    queryKey: APPLICATION_KEYS.owner,
    queryFn: getOwnerApplications,
    refetchInterval: 30_000,
  });
}

export function useApproveApplication() {
  return useMutation({ mutationFn: approveApplication });
}

export function useRejectApplication() {
  return useMutation({ mutationFn: rejectApplication });
}