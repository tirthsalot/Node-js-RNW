import express from "express";

import upload from "../middlewares/upload.js";

import controller from "../controller/travel.controller.js";
import travelController from "../controller/travel.controller.js";

const router = express.Router();

router.post("/add",upload.single("image",travelController.add));

export default router;