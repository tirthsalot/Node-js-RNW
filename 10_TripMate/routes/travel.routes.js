import express from "express";

import upload from "../middlewares/upload.js";

import controller from "../controller/travel.controller.js";
import travelController from "../controller/travel.controller.js";

const router = express.Router();

router.post("/add",upload.single("image",travelController.add));

router.get("/getAllPackage", travelController.getAllPackages);

router.get("/:id", travelController.getPackageById);

router.delete("/:id", travelController.deletePackage);

export default router;
