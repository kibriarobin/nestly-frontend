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
  status: BookingStatus;
  rentalType: RentalType;
  rent: string;
  createdAt: string;
  tenant: { id: string; name: string; email: string; phone: string | null };
  flat: { id: string; name: string; property: { title: string } };
  room: { id: string; name: string } | null;
  payment: {
    id: string;
    transactionId: string;
    amount: string;
    status: PaymentStatus;
    paidAt: string | null;
  } | null;
}
