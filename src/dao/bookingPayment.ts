import { Prisma, PrismaClient } from "@prisma/client";
import { debugLog } from "../services/helper";

const createBookingPayment = async (prisma: PrismaClient, data: Prisma.booking_paymentCreateInput) => {
  try {
    const result = await prisma.booking_payment.create({
      //orm object relation model
      data,
    });
    return result;
  } catch (error) {
    debugLog(error);
    throw error;
  }
};

const getBookingPayment = async (prisma: PrismaClient, id: number) => {
  try {
    const result = await prisma.booking_payment.findUnique({
      where: { id },
    });
    return result;
  } catch (error) {
    debugLog(error);
    throw error;
  }
};

const updateBookingPayment = async (prisma: PrismaClient, id: number, data: Prisma.booking_paymentUpdateInput) => {
  try {
    const result = await prisma.booking_payment.update({
      where: { id },
      data,
    });
    return result;
  } catch (error) {
    debugLog(error);
    throw error;
  }
};

export const booking_paymentDao = { createBookingPayment, getBookingPayment, updateBookingPayment };
