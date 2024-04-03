import { ParamSchema, Location } from "express-validator";

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
  isNumeric: checkBy === "optional" ? false : true,
  notEmpty: checkBy === "optional" ? false : true,
});

export const VALIDATION_EMAIL = (
  where: Location,
  checkBy?: "optional"
): ParamSchema => ({
  in: [where],
  isEmail: checkBy === "optional" ? false : true,
  notEmpty: checkBy === "optional" ? false : true,
});
