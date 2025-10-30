import { Router } from "express";
import { createMatchDay, createPost, getPosts } from "../controllers/post_controller.js";
const router = Router();

// Sample post route
router.get('/allposts',getPosts);
router.post('/createpost',createPost);
router.post('/creatematchday',createMatchDay);

export default router;