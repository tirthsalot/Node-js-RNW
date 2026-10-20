import userController from "../controller/Usercontroller.js";
import auth from "../middleware/auth.js";
import express from "express";


const router = express.Router();


router.post("/add",userController.add);

router.get("/getAllUser",auth, userController.getAllUser);

router.get("/login", userController.login);


export default router;
