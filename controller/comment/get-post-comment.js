import { commentModel } from "../../schema/comments.schema.js";

export const getPostComments = async (request , response) => {
    const postId = request.params.postId

    const comments = await commentModel
    .find({
     post : postId
    })
    .populate({
        path:"post",
        populate:{ path:"user" , select: "username profilePicture" },
    })
    .populate("user","username profilePicture")

    response.status(200).json(comments)
};