import { LikeModel } from "../models/LikeModel";

export const addLike = async (blogId: string, userId: string) => {
  await LikeModel.create({ user_id: userId, blog_id: blogId });
  return {
    status: 200,
    message: "Blog liked successfully. 🎉",
  };
};

export const removeLike = async (blogId: string, userId: string) => {
  await LikeModel.destroy({ where: { user_id: userId, blog_id: blogId } });
  return {
    message: "Like removed successfully. 🎉",
    status: 200,
  };
};

export const getBlogLikesCount = async (blogId: string) => {
  const data = await LikeModel.count({ where: { blog_id: blogId } });
  return {
    status: 200,
    data: data,
  };
};

export const likeExists = async (blogId: string, userId: string) => {
  const like = await LikeModel.findOne({
    where: {
      blog_id: blogId,
      user_id: userId,
    },
  });
  if (like) return true;
  return false;
};
