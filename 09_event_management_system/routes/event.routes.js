
import express from "express";
import eventController from "../controller/eventController.js"
import upload from "../middleware/upload.js"

const router = express.Router();

router.post("/add",upload.fields([

  {name:"EventImg",maxCount:2},
  {name:"EventPoster",maxCount:1},
  {name:"EventBanner",maxCount:3},
  {name:"EventSpeakers",maxCount:4},
  {name:"EventDocument",maxCount:10}

]),eventController.add);

export default router;