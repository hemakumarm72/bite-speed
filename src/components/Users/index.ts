import express from "express";

import identityComponents from "./identity";

const router = express.Router();

router.use("/identity", identityComponents);

export default router;
