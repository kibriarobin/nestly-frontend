import type { BookingStatus, PaymentStatus, RentalType } from "./status.type";

export interface IPaymentBooking {
  id: string;
  status: BookingStatus;
  rentalType: RentalType;
  rent: string;
  flat: { name: string; rent: string | null; property: { title: string } };
  room: { name: string; rent: string } | null;
}

export interface IPayment {
  id: string;
  bookingId: string;
  transactionId: string;
  amount: string;
  method: "SSLCOMMERZ";
  status: PaymentStatus;
  paidAt: string | null;
  createdAt: string;
  booking: IPaymentBooking;
}

export interface IPaymentSession {
  paymentUrl: string;
}

export interface IBookingDetail {
  id: string;
  status: BookingStatus;
  rentalType: RentalType;
  rent: string;
  flat: { name: string; property: { title: string; city: string } };
  room: { name: string } | null;
  payment: {
    transactionId: string;
    amount: string;
    status: PaymentStatus;
    paidAt: string | null;
  } | null;
}
