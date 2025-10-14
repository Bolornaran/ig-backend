import { userModel } from "../../schema/user.schema.js"

export const followUser = async (request , response) => {
    const followedUserId = request.params.followedUserId
    const followingUserId = request.user._id
  
    if ( followedUserId === followingUserId  ) { 
        response.status(400).json({message:"you can't follow yourself"})
        return
    }

   const followingUser = await userModel.findById(followingUserId)
   const followedUser = await userModel.findById(followedUserId)

   const followedUser_followers= followedUser.followers

   const isFollowed = followedUser_followers.includes(followingUserId)

   if(isFollowed){
      await userModel.findByIdAndUpdate(followingUserId,{
        following: followingUser.following.filter(item=>item.toString() !== followedUserId)
      })

       await userModel.findByIdAndUpdate(followedUserId,{
        followers: followedUser.followers.filter(item=>item.toString() !== followingUserId)
      })
      response.status(200).json({ message:"success"})
   } else {
       await userModel.findByIdAndUpdate(followingUserId,{
      following:[...followingUser.following, followedUserId]
      })

      await userModel.findByIdAndUpdate(followedUserId,{
        followers:[...followedUser.followers, followingUserId]
   })

   }
}


