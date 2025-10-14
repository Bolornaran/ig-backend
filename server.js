import express from "express";
import mongoose from "mongoose";
import cors from "cors";
// import { hash , compare } from "bcrypt";
// import { userModel } from "./schema/user.schema.js";
// import { postModel } from "./schema/post.schema.js";
import userRouter from "./router/user/user.route.js";
// import { getUserPosts } from "./controller/post/get-user-posts.js";
import postRouter from "./router/post/post.route.js";
import dotenv from "dotenv";

dotenv.config()

const port = 5555;
const app = express();
app.use(cors());
app.use(express.json());

const connectToMongoDBB = async () => {
  await mongoose.connect(
    process.env.MONGO_DB_URI
  );
};
connectToMongoDBB();


app.use('/' , userRouter)
app.use('/post' , postRouter)

console.log(process.env.MONGO_DB_URI)


app.listen(port, () => {
  console.log("Server is running on http://localhost:5555");
});
