import express from "express";
import { getPosts } from "../../controller/post/get-user-posts.js";
import { createPost } from "../../controller/post/create-post.js";
import {authMiddleware} from '../../middleware/auth-middleware.js';
import { togglePostLike } from "../../controller/post/toggle-post-like.js";

const postRouter = express.Router() 

postRouter.get("/all-posts" ,authMiddleware, getPosts)
postRouter.post("/create" ,authMiddleware,createPost)
postRouter.post("/toggle-like/:postId" ,authMiddleware,togglePostLike)

export default postRouter ; 
