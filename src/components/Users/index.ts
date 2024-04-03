import express from "express";

import identityComponents from "./identity";

const router = express.Router();

router.use("/user", identityComponents);

export default router;
