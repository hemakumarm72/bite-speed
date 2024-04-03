import { Request, Response, NextFunction } from "express";
import {
  NewContractDocument,
  UpdateContractDocument,
} from "../../../models/@types";
import * as Service from "./identity.service";
import sequelizeConnection from "../../../models/db.connect";
import { Transaction } from "sequelize";
import { invalidException } from "../../../utils/apiErrorHandler";

export const addContract = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, phoneNumber } = req.body;
    if (email === null && phoneNumber === null)
      throw invalidException(
        "Either email or phoneNumber must be filled in.",
        "2020" // TODO: subStatus code
      );
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
