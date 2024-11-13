import { Request, Response } from "express";
import { userDao } from "../dao/user";
import prisma from "../prisma";
import { CreateUserRequest, UpdateUserRequest } from "../types/userTypes";

const createUser = async (req: Request<{}, {}, CreateUserRequest>, res: Response) => {
  try {
    const data = req.body;
    const result = await userDao.createUser(prisma, data);
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

const getUserDetails = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const id = req.params.id ? +req.params?.id : null;
    if (!id) {
      throw Error("id is required");
    }
    const result = await userDao.getUser(prisma, id);
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

const updateUser = async (req: Request<{ id: string }, {}, UpdateUserRequest>, res: Response) => {
  try {
    const data = req.body;
    const id = +req.params.id;
    const result = await userDao.updateUser(prisma, id, data);
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

export const userController = { createUser, getUserDetails, updateUser };
