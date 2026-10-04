import type { FlatStatus } from "./status.type";

export interface ICreateRoomPayload {
  flatId: string;
  name: string;
  rent: number;
  description: string;
}

export interface IRoomFlat {
  id: string;
  name: string;
  property: { id: string; title: string; city: string };
}

export interface IRoom {
  id: string;
  flatId: string;
  name: string;
  rent: string | null;
  description: string | null;
  status: FlatStatus;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  flat?: IRoomFlat;
}

export interface IUpdateRoomPayload {
  name?: string;
  rent?: number;
  description?: string;
  status?: FlatStatus;
}

export type IRoomSummary = Pick<IRoom, "id" | "status">;

export interface IRoomDetail extends IRoom {
  flat: IRoomFlat;
}
