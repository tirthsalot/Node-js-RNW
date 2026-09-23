import express from express;
import theater from "../model/theater.model.js";

const router = express.Router();

router.post("/add",theaterController.add);