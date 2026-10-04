import type { ApplicationStatus, RentalType } from "./status.type";

export interface IApplicationTenant {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
}

export interface IApplicationFlat {
  id: string;
  name: string;
  property: { title: string };
}

export interface IApplicationRoom {
  id: string;
  name: string;
}

export interface IOwnerApplication {
  id: string;
  tenantId: string;
  flatId: string;
  roomId: string | null;
  rentalType: RentalType;
  rent: string;
  status: ApplicationStatus;
  message: string | null;
  appliedAt: string;
  approvedAt: string | null;
  confirmedAt: string | null;
  createdAt: string;
  updatedAt: string;
  tenant: IApplicationTenant;
  flat: IApplicationFlat;
  room: IApplicationRoom | null;
}