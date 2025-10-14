import { postModel } from "../../schema/post.schema.js"

export const togglePostLike = async(request,response) => {
    const user = request.user

    const params = request.params
    const postId = params.postId

    const post = await postModel.findBy({ postId })

    response.status(200).json(post)

    const postLike = post.likes
    const isLiked = postLike.includes(user._id)


    if (isLiked){
        await postModel.findByIdAndUpdate(postId,{
            likes: postLike.filter((likes) => likes.toString() !== user._id)
        })
    }else{
        await postModel.findByIdAndUpdate(postId,{
            likes: [...postLike , user._id]
        })
    }

    response.status(200).json({message:"success"})
}