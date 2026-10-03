import type { IFlat } from "./flat.type";
import type { PropertyStatus } from "./status.type";

export interface IPropertyOwner {
  id: string;
  name: string;
  email: string;
}

export interface IProperty {
  id: string;
  ownerId: string;
  title: string;
  address: string;
  city: string;
  description: string | null;
  status: PropertyStatus;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  owner?: IPropertyOwner;
}

export interface IMyProperty extends IProperty {
  _count?: { flats: number };
}

export interface IPropertyDetail extends IProperty {
  flats: IFlat[];
}

export interface ICreatePropertyPayload {
  title: string;
  address: string;
  city: string;
  description: string;
}

export type IUpdatePropertyPayload = Partial<ICreatePropertyPayload>;

export type PropertyStatusUpdate = Exclude<PropertyStatus, "PENDING">;

export interface IPropertyQuery {
  searchTerm?: string;
  status?: PropertyStatus;
  page?: number;
  limit?: number;
}
