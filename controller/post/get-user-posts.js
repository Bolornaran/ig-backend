 import {postModel} from"../../schema/post.schema.js"
 
 export const getPosts =async (request , response) => {
  const posts = await postModel.find().populate("user")


  response.status(200).json(posts)
}