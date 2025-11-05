import { Router } from "express";
const router = Router();
import { createLiveMatchController, getLiveMatchController, sendLiveEventController } from "../controllers/livestream_controller.js";
import { pushNotification } from "../controllers/push_notification_controller.js";


router.get("/getlivematch", getLiveMatchController);
router.post("/createlivematch", createLiveMatchController);
router.post('/sendevent',sendLiveEventController)
router.post('/notifiy',pushNotification)

export default router;