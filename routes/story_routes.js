import { Router } from "express";
import { createStory, getStoryController } from "../controllers/story_controller.js";
import upload from "../helper/cloudinary.js";
const router = Router();

router.post('/createstory',upload.array('media'),createStory)
router.get('/getstory',getStoryController)

export default router; 