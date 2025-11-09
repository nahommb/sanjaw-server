import { Router } from "express";
import { createMatchDay, createPost, getMatchDays, getPosts } from "../controllers/post_controller.js";
import upload from "../helper/cloudinary.js";

const router = Router();


// Sample post route
router.get('/allposts',getPosts);
router.post('/createpost',upload.array('media'),createPost);
router.post('/creatematchday',createMatchDay);
router.get('/matchdays', getMatchDays);

export default router;