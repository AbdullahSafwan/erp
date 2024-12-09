import { Prisma, PrismaClient } from "@prisma/client";
import { debugLog } from "../services/helper";

const createBooking = async (prisma: PrismaClient, data: Prisma.bookingCreateInput) => {
  try {
    const result = await prisma.booking.create({
      data,
    });
    return result;
  } catch (error) {
    debugLog(error);
    throw error;
  }
};

const getBooking = async (prisma: PrismaClient, id: number) => {
  try {
    const result = await prisma.booking.findUnique({
      where: { id },
      include: {
        booking_items: true,
        booking_payments: true,
        contact_log: true,
        delivery: true,
      },
    });
    return result;
  } catch (error) {
    debugLog(error);
    throw error;
  }
};

const listBookings = async (prisma: PrismaClient, page: number, pageSize: number, _sort: string | null, _orderBy: string | null) => {
  try {
    const sort = (_sort ?? "id").toString();
    const order = _orderBy;
    const orderBy = { [sort]: order };

    const result = await prisma.booking.findMany({
      orderBy,

      // Offset pagination

      skip: (page - 1) * pageSize,
      take: pageSize,

      select: {
        clientName: true,
        code: true,
        createdAt: true,
        appointmentDate: true,
        whatsappNumber: true,
        id: true,
        status: true,
        booking_items: {
          select: {
            name: true,
          },
        },
      },
    });
    // Total bookings
    const totalBookings = await prisma.booking.count();

    // Total number of booking pages
    const totalPages = Math.ceil(totalBookings / pageSize);

    return {
      bookings: result, // The current page of bookings
      totalPages, // Total number of pages
      totalBookings, // Total number of bookings
    };
  } catch (error) {
    debugLog(error);
    throw error;
  }
};

const updateBooking = async (prisma: PrismaClient, id: number, data: Prisma.bookingUpdateInput) => {
  try {
    const result = await prisma.booking.update({
      where: { id },
      data,
      include: {
        booking_items: true,
        booking_payments: true,
        contact_log: true,
        delivery: true,
      },
    });
    return result;
  } catch (error) {
    debugLog(error);
    throw error;
  }
};

export const bookingDao = { createBooking, getBooking, updateBooking, listBookings };
