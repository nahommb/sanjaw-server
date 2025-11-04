import { Router } from "express";
const router = Router();
import { createLiveMatchController, getLiveMatchController, sendLiveEventController } from "../controllers/livestream_controller.js";


router.get("/getlivematch", getLiveMatchController);
router.post("/createlivematch", createLiveMatchController);
router.post('/sendevent',sendLiveEventController)

export default router;