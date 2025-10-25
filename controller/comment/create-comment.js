import { commentModel } from "../../schema/comment.schema.js"

export const createComment = async (request,response) => {
  const userId = request.user._id
  const { postId , comment } = request.body

  const createdComment = await commentModel.create({
     user:userId,
     post:postId,
     comment,
  })

  response.status(200).json(createdComment)
}