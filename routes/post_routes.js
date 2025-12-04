import { Router } from "express";
import { createMatchDay, createPost, deletePost, getMatchDays, getPosts } from "../controllers/post_controller.js";
import upload from "../helper/cloudinary.js";

const router = Router();


// Sample post route
router.get('/allposts',getPosts);
router.post('/createpost',upload.array('media',10),createPost);
router.post('/creatematchday',createMatchDay);
router.get('/matchdays', getMatchDays);
router.delete('/deletepost/:id',deletePost);

export default router; 