import { Request, Response, NextFunction } from "express";
import {
  ContactDocument,
  NewContactDocument,
  UpdateContactDocument,
} from "../../../models/@types";
import * as Service from "./identity.service";
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

    const contactEmail = req.isEmail as ContactDocument;
    const contactPhone = req.isPhoneNo as ContactDocument;
    console.log(contactEmail, contactPhone);
    const isBoth =
      contactEmail && contactPhone
        ? contactEmail.email !== contactPhone.email &&
          contactEmail.phoneNumber !== contactPhone.phoneNumber // TODO: two different state db we consider primary
          ? true
          : contactEmail.linkPrecedence === "primary"
          ? true
          : contactPhone.linkPrecedence === "primary"
          ? true
          : false
        : false;

    const create: NewContactDocument = {
      email,
      phoneNumber,
      linkedId:
        contactEmail && contactPhone
          ? contactEmail.email !== contactPhone.email &&
            contactEmail.phoneNumber !== contactPhone.phoneNumber // TODO: two different state db we consider primary
            ? contactEmail.id
            : contactEmail.linkPrecedence === "primary"
            ? contactEmail.id
            : contactPhone.linkPrecedence === "primary"
            ? contactPhone.id
            : null
          : contactEmail
          ? contactEmail.id
          : contactPhone
          ? contactPhone.id
          : null,
      linkPrecedence:
        contactEmail && contactPhone
          ? contactEmail.email !== contactPhone.email &&
            contactEmail.phoneNumber !== contactPhone.phoneNumber // TODO: two different state db we consider primary
            ? "secondary"
            : contactEmail.linkPrecedence === "primary"
            ? "secondary"
            : contactPhone.linkPrecedence === "primary"
            ? "secondary"
            : "primary"
          : contactEmail
          ? "secondary"
          : contactPhone
          ? "secondary"
          : "primary",
      deletedAt: null,
    };

    const result = await Service.createContract(create, contactPhone, isBoth); // TODO: create and update contract model

    return res.status(200).json({
      success: true,
      contact: result,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};
