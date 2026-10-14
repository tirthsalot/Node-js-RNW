import express from "express";
import travelController from "../controller/travel.controller.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.post(
  "/add",
  upload.fields([{ name: "travelImage", maxCount: 1 }]),
  travelController.add
);

router.get("/showAll", travelController.getAllPackages);
router.get("/show/:id", travelController.getPackageById);
router.delete("/delete/:id", travelController.deletePackage);

router.put(
  "/update/:id",
  upload.fields([{ name: "travelImage", maxCount: 1 }]),
  travelController.updatePackageDetail
);

export default router;
