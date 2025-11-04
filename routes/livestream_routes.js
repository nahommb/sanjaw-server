import { Router } from "express";
const router = Router();
import { createLiveMatchController, getLiveMatchController } from "../controllers/livestream_controller.js";


router.get("/getlivematch", getLiveMatchController);
router.post("/createlivematch", createLiveMatchController);


export default router;