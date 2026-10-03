import { useMutation } from "@tanstack/react-query";
import { createFlat } from "@/api";

export function useCreateFlat() {
  return useMutation({ mutationFn: createFlat });
}
