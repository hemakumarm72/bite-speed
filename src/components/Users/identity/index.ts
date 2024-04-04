import express from "express";
import { checkSchema } from "express-validator";

import * as controller from "./identity.controller";
import { checkValidation } from "../../../utils/validation";
import { ADD_CONTRACT, GET_SCHEMA } from "./identity.validation";
const router = express.Router();

router.post(
  "/",
  checkSchema(ADD_CONTRACT),
  checkValidation,
  controller.addContract
);

router.get(
  "/",
  checkSchema(GET_SCHEMA),
  checkValidation,
  controller.getContractByAll
);
export default router;
