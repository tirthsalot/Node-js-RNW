import express from express;
import TheaterController from "../controller/Theater.controller.js";

const router = express.Router();

router.post("/add",TheaterController.add);
router.get("/getAllTheater",TheaterController.getAllTheater);
router.get("/:id",TheaterController.getTheaterbyId);
router.delete("/:deleteTheater",TheaterController.deleteTheaterById);

export default router