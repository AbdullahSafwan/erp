import { Prisma, PrismaClient } from "@prisma/client";


const createContactlog = async (prisma: PrismaClient, data: Prisma.contact_logCreateInput) => {
  try {
    const result = await prisma.contact_log.create({ //orm object relation model
      data,
    });
    return result
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const contactlogDao = { createContactlog }