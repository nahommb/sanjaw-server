import { Router } from "express";
const router = Router();
import { createLiveMatchController, editLiveScoreController, getLiveMatchController, sendLiveEventController,endLiveMatchController } from "../controllers/livestream_controller.js";
import { pushNotification } from "../controllers/push_notification_controller.js";


router.get("/getlivematch", getLiveMatchController);
router.post("/createlivematch", createLiveMatchController);
router.post('/updatescore',editLiveScoreController)
router.post('/sendevent',sendLiveEventController)
router.post('/notify',pushNotification)
router.patch('/endmatch/:id',endLiveMatchController)

export default router; 