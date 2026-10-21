import userController from "../controller/Usercontroller.js";
import auth from "../middleware/auth.js";
import express from "express";


const router = express.Router();


router.post("/add",userController.add);

router.get("/getAllUser",auth, userController.getAllUser);

router.get("/login", userController.login);

router.get("/authLogin",auth,userController.authLogin);

router.delete("/deleteUser",auth,userController.deleteUser);


export default router;
