import { Request, Response, NextFunction } from "express";
import {
  NewContractDocument,
  UpdateContractDocument,
} from "../../../models/@types";
import * as Service from "./identity.service";
import sequelizeConnection from "../../../models/db.connect";
import { Transaction } from "sequelize";

export const addContract = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, phoneNumber } = req.body;
    const data: NewContractDocument = {
      email,
      phoneNumber,
      linkedId: null,
      linkPrecedence: "primary",
      deletedAt: null,
    };

    await Service.createContract(data);

    return res.status(200).json({
      success: true,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};
