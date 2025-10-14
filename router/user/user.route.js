import express from "express"; 
import { signup } from "../../controller/user/sign-up.js";
import { login } from "../../controller/user/login.js";
import { authMiddleware } from "../../middleware/auth-middleware.js";
import {followUser} from "../../controller/user/follow-user.js"

const userRouter = express.Router();

userRouter.post("/signup" , signup)
userRouter.post("/login" , login)
userRouter.post("/follow-toggle/:followedUserId",authMiddleware, followUser)

export default userRouter;