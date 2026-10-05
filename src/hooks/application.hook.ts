// hooks/application.hook.ts
import { useMutation, useQuery } from "@tanstack/react-query";
import { cancelApplication, createApplication, getMyApplications } from "@/api";

export const APPLICATION_KEYS = {
  mine: ["applications", "mine"] as const,
};

export function useMyApplications() {
  return useQuery({
    queryKey: APPLICATION_KEYS.mine,
    queryFn: getMyApplications,
  });
}

export function useCreateApplication() {
  return useMutation({ mutationFn: createApplication });
}

export function useCancelApplication() {
  return useMutation({ mutationFn: cancelApplication });
}