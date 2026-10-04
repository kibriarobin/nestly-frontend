import type { IRoom } from "./room.type";
import type { FlatStatus, PropertyStatus } from "./status.type";

export interface ICreateFlatPayload {
  propertyId: string;
  name: string;
  floor: number;
  rent: number;
  description: string;
}

export interface IFlatProperty {
  id: string;
  title: string;
  city: string;
  status: PropertyStatus;
  ownerId?: string;
}

export interface IFlat {
  id: string;
  propertyId: string;
  name: string;
  floor: number | null;
  rent: string | null;
  description: string | null;
  status: FlatStatus;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  property?: IFlatProperty;
  rooms?: IRoom[];
}

export interface IUpdateFlatPayload {
  name?: string;
  floor?: number;
  rent?: number;
  description?: string;
  status?: FlatStatus;
}

export interface IFlatDetail extends IFlat {
  property: IFlatProperty;
  rooms: IRoom[];
}
