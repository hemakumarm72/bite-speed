import { ParamSchema, Location } from "express-validator";
import { getContractByEmail, getContractByPhoneNo } from "../models/contract";
import { ContactDocument } from "../models/@types";

export const VALIDATION_STRING = (
  where: Location,
  checkBy?: "optional"
): ParamSchema => ({
  in: [where],
  isString: checkBy === "optional" ? false : true,
  notEmpty: checkBy === "optional" ? false : true,
});

export const VALIDATION_NUMBER = (
  where: Location,
  checkBy?: "optional"
): ParamSchema => ({
  in: [where],
  isString: checkBy === "optional" ? false : true,
  notEmpty: checkBy === "optional" ? false : true,
  custom: {
    options: async (value: string, { req, location, path }) => {
      if (value === null || value === undefined) return true;
      const result = await getContractByPhoneNo(value);
      req.isPhoneNo = result as ContactDocument;
      return true;
    },
  },
});

export const VALIDATION_EMAIL = (
  where: Location,
  checkBy?: "optional"
): ParamSchema => ({
  in: [where],
  isEmail: checkBy === "optional" ? false : true,
  notEmpty: checkBy === "optional" ? false : true,
  custom: {
    options: async (value: string, { req, location, path }) => {
      if (value === null || value === undefined) return true;
      const result = await getContractByEmail(value);
      req.isEmail = result as ContactDocument;
      return true;
    },
  },
});
