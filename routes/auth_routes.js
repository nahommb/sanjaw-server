import { Router } from "express";
import { createAdmin, loginController, validetToken } from "../controllers/auth_controller.js";

const router = Router();

router.post('/createadmin',createAdmin);
router.post('/login',loginController)
router.get('/me',validetToken)

export default router;