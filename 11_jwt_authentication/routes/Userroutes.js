import userController from "../controller/Usercontroller.js";

const router = express.Router();


router.post("/add",userController.add);

router.get("/getAllUser", userController.getAllUser);

router.get("/login", userController.login);


export default router;
