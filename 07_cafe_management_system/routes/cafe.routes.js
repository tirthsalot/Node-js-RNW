import express from "express";

import cafeController from "../controller/cafeController.js"

const Routes = express.Router();

Routes.post("/add",cafeController);

export default Routes;

