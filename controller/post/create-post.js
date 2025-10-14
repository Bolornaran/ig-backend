import {postModel} from"../../schema/post.schema.js"

export const createPost = async (request, response) => {
  const body = request.body;
  const user = request.user;

  const userId = body.userId;
  const images = body.images;
  const caption = body.caption;

  const createdPost = await postModel.create({
    user: user._id,
    images: images,
    caption: caption,
  });
  response.status(200).json(createdPost);
}