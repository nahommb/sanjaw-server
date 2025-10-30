import { Router } from "express";
import { createPost, getPosts } from "../controllers/post_controller.js";
const router = Router();

// Sample post route
router.get('/allposts',getPosts);
router.post('/createpost',createPost);

export default router;