import { Router } from "express";
import { createStory } from "../controllers/story_controller";
import upload from "../helper/cloudinary";
const router = Router();

router.post('/createstory',upload.array('media'),createStory)

export default router;