import { Router } from "express";
const router = Router();
import { LivestreamController } from "../controllers/livestream_controller.js";


router.post("/", LivestreamController);

export default router;