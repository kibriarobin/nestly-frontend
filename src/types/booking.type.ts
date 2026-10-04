import type { BookingStatus, PaymentStatus, RentalType } from "./status.type";

export interface IOwnerBookingTenant {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
}

export interface IOwnerBookingFlat {
  id: string;
  name: string;
  property: { title: string };
}

export interface IOwnerBookingRoom {
  id: string;
  name: string;
}

export interface IOwnerBookingPayment {
  id: string;
  amount: string;
  method: string;
  status: PaymentStatus;
  paidAt: string | null;
}

export interface IOwnerBooking {
  id: string;
  applicationId: string;
  tenantId: string;
  flatId: string;
  roomId: string | null;
  rentalType: RentalType;
  rent: string;
  status: BookingStatus;
  confirmedAt: string | null;
  cancelledAt: string | null;
  completedAt: string | null;
  createdAt: string;
  updatedAt: string;
  tenant: IOwnerBookingTenant;
  flat: IOwnerBookingFlat;
  room: IOwnerBookingRoom | null;
  payment: IOwnerBookingPayment | null;
}