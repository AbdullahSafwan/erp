import { Request, Response } from "express";
import { contactLogDao } from "../dao/contactLog";
import prisma from "../prisma";

const createContactLog = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const result = await contactLogDao.createContactLog(prisma, data);
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

const getContactLogDetails = async (req: Request, res: Response) => {
  try {
    const id = req.params.id ? +req.params?.id : null;
    if (!id) {
      throw Error("id is required");
    }
    const result = await contactLogDao.getContactLog(prisma, id);
    res.status(200).send(result);

    // If no contact log is found, return a 400 error and exit early
    if (!result) {
      res.status(400).send(new Error('Contact log not found'));
      return;
    }
    
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

const updateContactLog = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const id = +req.params.id;
    const result = await contactLogDao.updateContactLog(prisma, id, data);
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

export const contactLogController = { createContactLog, getContactLogDetails, updateContactLog };
