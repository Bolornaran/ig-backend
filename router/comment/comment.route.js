import express from "express";
import { authMiddleware } from "../../middleware/auth-middleware.js";
import { createComment } from "../../controller/comment/create-comment.js";
import { getPostComments } from "../../controller/comment/get-post-comment.js";

const commentRouter = express.Router()

commentRouter.post("/create" , authMiddleware ,createComment )
commentRouter.get("/get/:postId", authMiddleware , getPostComments)

export default commentRouter