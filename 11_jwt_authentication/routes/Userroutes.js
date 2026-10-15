import userController from "../controller/Usercontroller.js";

const router = express.Router();


router.post("/add",userController.add);


export default router;