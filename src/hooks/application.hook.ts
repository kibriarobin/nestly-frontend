import { useMutation, useQuery } from "@tanstack/react-query";
import {
  approveApplication,
  cancelApplication,
  createApplication,
  getMyApplications,
  getOwnerApplications,
  rejectApplication,
} from "@/api";

export const APPLICATION_KEYS = {
  mine: ["applications", "mine"] as const,
  owner: ["applications", "owner"] as const,
};

export function useMyApplications() {
  return useQuery({
    queryKey: APPLICATION_KEYS.mine,
    queryFn: getMyApplications,
  });
}

export function useOwnerApplications() {
  return useQuery({
    queryKey: APPLICATION_KEYS.owner,
    queryFn: getOwnerApplications,
  });
}

export function useCreateApplication() {
  return useMutation({ mutationFn: createApplication });
}

export function useCancelApplication() {
  return useMutation({ mutationFn: cancelApplication });
}

export function useApproveApplication() {
  return useMutation({ mutationFn: approveApplication });
}

export function useRejectApplication() {
  return useMutation({ mutationFn: rejectApplication });
}
