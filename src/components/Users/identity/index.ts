import express from "express";
import { checkSchema } from "express-validator";

import * as controller from "./identity.controller";
import { checkValidation } from "../../../utils/validation";
import { ADD_CONTRACT } from "./identity.validation";
const router = express.Router();

router.post(
  "/",
  checkSchema(ADD_CONTRACT),
  checkValidation,
  controller.addContract
);

export default router;
