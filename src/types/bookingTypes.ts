import { booking_item_type } from "@prisma/client";

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

export interface UpdateBookingRequest {
  clientName?: string;
  phoneNumber?: string;
  whatsappNumber?: string;
  paidAmount?: number;
  booking_items?: UpdateBookingItem[];
}



export interface UpdateBookingItem {
  name?: string;
  type?: booking_item_type;
  payableAmount?: number;
  paidAmount?: number;
}
