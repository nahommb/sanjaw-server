import { Router } from "express";
import { createPreviousMatchController, getPreviousMacthController } from "../controllers/previous_macth_controller.js";

const router = Router();

router.post('/createpreviousmatches',createPreviousMatchController);
router.get('/getpreviousmatches',getPreviousMacthController);

export default router;