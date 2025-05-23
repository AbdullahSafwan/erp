import { Prisma, PrismaClient } from "@prisma/client";
import { debugLog } from "../services/helper";

const createUser = async (prisma: PrismaClient, data: Prisma.userCreateInput) => {
  try {
    const result = await prisma.user.create({
      data,
    });
    return result;
  } catch (error) {
    debugLog(error);
    throw error;
  }
};

const getUser = async (prisma: PrismaClient, id: number) => {
  try {
    const result = await prisma.user.findUnique({
      where: { id },
    });
    return result;
  } catch (error) {
    debugLog(error);
    throw error;
  }
};
const findUserByEmail = async (prisma: PrismaClient, email: string) => {
  try {
    const result = await prisma.user.findUnique({
      where: { email },
    });
    return result;
  } catch (error) {
    debugLog(error);
    throw error;
  }
};


const updateUser = async (prisma: PrismaClient, id: number, data: Prisma.userUpdateInput) => {
  try {
    const result = await prisma.user.update({
      where: { id },
      data,
    });
    return result;
  } catch (error) {
    debugLog(error);
    throw error;
  }
};

export const userDao = { createUser, getUser, updateUser, findUserByEmail };
