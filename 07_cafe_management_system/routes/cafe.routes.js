import express from "express";

import cafeController from "../controller/cafeController.js"

const Routes = express.Router();

Routes.post("/add",cafeController.add);

Routes.get("/addAllcafeData", cafeController.addAllcafeData);

Routes.delete("/deleteAll", cafeController.deleteAllData);

Routes.get("/:id", cafeController.getCafeById);

Routes.delete("/:id", cafeController.deleteCafe);

export default Routes;

