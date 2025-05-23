import { booking_item_type, booking_status } from "@prisma/client";

export interface BookingItem {
  name: string;
  type: booking_item_type;
  payableAmount: number;
  paidAmount?: number;
}

export interface CreateBookingRequest {
  clientName: string;
  phoneNumber: string;
  whatsappNumber: string;
  payableAmount: number;
  code?: string;
  paidAmount?: number;
  booking_items: BookingItem[];
}

export interface GetBookingDetailsRequest {
  id: number;
}

export interface UpdateBookingRequest {
  clientName?: string;
  phoneNumber?: string;
  whatsappNumber?: string;
  paidAmount?: number;
  booking_items?: (UpdateBookingItem | CreateBookingItem)[];
  status?: booking_status;
}

export interface ListBookingsRequest {
  page?: string;
  pageSize?: string;
  sortBy?: string;
  orderBy?: string;
  status?: booking_status;
}

export interface UpdateBookingItem {
  id: number;
  name?: string;
  type?: booking_item_type;
  payableAmount?: number;
  paidAmount?: number;
}

export interface CreateBookingItem {
  name: string;
  type: booking_item_type;
  payableAmount: number;
  paidAmount?: number;
}
