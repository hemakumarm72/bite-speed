import express from "express";
const router = express.Router();

import userComponent from "./Users";

router.use("/user", userComponent);

export default router;
