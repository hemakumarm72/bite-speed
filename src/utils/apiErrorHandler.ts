import * as ERROR from "../constants/errorMessage";
import { ValidationError } from "express-validator";
/**
 * HttpException.
 * @param {number} statusCode The first message.
 * @param {string} message The second code.
 * @param {string | string[]} errorMessage The third status.
 * @param {number} subStatusCode The third status.
 *  @return {any}
 */
export class HttpException extends Error {
  statusCode?: number;
  message: string;
  errorMessage: string | string[];
  subStatusCode?: string;
  /**
   * HttpException.
   * @param {number} statusCode The first message.
   * @param {string} messages The second code.
   * @param {string} subStatusCode The third status.
   */
  constructor(
    statusCode: number,
    messages: string | string[],
    subStatusCode: string
  ) {
    super(messages[0]);
    this.statusCode = statusCode || 500;
    this.message = Array.isArray(messages) ? messages[0] : messages;
    this.errorMessage = messages;
    this.subStatusCode = subStatusCode;
  }
}

export const validationException = (errors: ValidationError[]) => {
  //   errors && console.warn(errors);
  errors;
  return new HttpException(
    400,
    errors[0].type === "field"
      ? `Validation Error: ${errors[0].path}`
      : "Validation Error: " + errors[0].msg,
    errors[0].type === "field"
      ? errors[0].msg === "Invalid value"
        ? "2005"
        : errors[0].msg
      : "0000"
  );
};

export const invalidException = (error: string, subStatusCode: string) => {
  error;
  return new HttpException(400, error || ERROR.DATANOTFOUND, subStatusCode);
};

export const dataNotExistException = (error: string) => {
  error;
  return new HttpException(400, error || ERROR.DATANOTFOUND, "1002");
};

export const userNotActivateException = (error: string) => {
  error;
  return new HttpException(400, error || ERROR.USERNOTACTIVATE, "1003");
};

export const dataExceedException = (error: string) => {
  error;
  return new HttpException(400, error || ERROR.DATAEXCEED, "1004");
};

export const unauthorizedException = (error: string) => {
  error;
  return new HttpException(401, error || ERROR.UNAUTH, "2001");
};
export const dataConflictException = (
  error: string,
  subStatusCode?: string
) => {
  return new HttpException(
    409,
    error || ERROR.CONFLICT,
    subStatusCode ? subStatusCode : "3001"
  );
};

export const pageNoFoundException = (error: string) => {
  return new HttpException(404, error || ERROR.PAGENOTFOUND, "4000");
};

export const dataNotFoundException = (error: string) => {
  return new HttpException(404, error || ERROR.PAGENOTFOUND, "2005");
};

export const badImplementationException = (error: string) => {
  return new HttpException(500, error || ERROR.BADIMPLEMENTATION, "5000");
};

export const softDeleteImplementation = (error: string) => {
  return new HttpException(404, error || ERROR.PAGENOTFOUND, "1015");
};

export const apiLimitationExceed = (error: string) => {
  return new HttpException(500, error || ERROR.PAGENOTFOUND, "1020");
};

/* TODO: subStatusCode error 
  1. 1020 is ip is over limit exceed 
  2. 1021 is otp is expired
 */
