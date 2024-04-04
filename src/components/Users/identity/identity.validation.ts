import { Schema } from "express-validator";
import {
  VALIDATION_EMAIL,
  VALIDATION_NUMBER,
} from "../../../constants/validation";

export const ADD_CONTRACT: Schema = {
  email: VALIDATION_EMAIL("body", "optional"),
  phoneNumber: VALIDATION_NUMBER("body", "optional"),
};

export const GET_SCHEMA: Schema = {};
