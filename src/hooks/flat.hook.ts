import { useMutation } from "@tanstack/react-query";
import { createFlat, deleteFlat, updateFlat } from "@/api";
import type { IUpdateFlatPayload } from "@/types";

export function useCreateFlat() {
  return useMutation({ mutationFn: createFlat });
}

export function useUpdateFlat() {
  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: IUpdateFlatPayload;
    }) => updateFlat(id, payload),
  });
}

export function useDeleteFlat() {
  return useMutation({ mutationFn: deleteFlat });
}
