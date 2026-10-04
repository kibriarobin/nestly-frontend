import { useMutation } from "@tanstack/react-query";
import { createRoom, deleteRoom, updateRoom } from "@/api";
import type { IUpdateRoomPayload } from "@/types";

export function useCreateRoom() {
  return useMutation({ mutationFn: createRoom });
}

export function useUpdateRoom() {
  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: IUpdateRoomPayload;
    }) => updateRoom(id, payload),
  });
}

export function useDeleteRoom() {
  return useMutation({ mutationFn: deleteRoom });
}
