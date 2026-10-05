import type {
  ApplicationStatus,
  BookingStatus,
  RentalType,
} from "./status.type";

export interface ICreateApplicationPayload {
  flatId: string;
  roomId?: string;
  rentalType: RentalType;
  message?: string;
}

export interface IApplicationBooking {
  id: string;
  status: BookingStatus;
}

export interface IApplication {
  id: string;
  tenantId: string;
  flatId: string;
  roomId: string | null;
  rentalType: RentalType;
  rent: string;
  message: string | null;
  status: ApplicationStatus;
  approvedAt: string | null;
  createdAt: string;
  updatedAt: string;
  flat: {
    id: string;
    name: string;
    property: { title: string; city?: string };
  };
  room: { id: string; name: string } | null;
  booking?: IApplicationBooking | null;
}