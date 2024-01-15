import { LikeModel } from "../models/LikeModel";

/**
 * Adds a new like to a specific blog by a user.
 * @param blogId - The ID of the blog to which the like is added.
 * @param userId - The ID of the user adding the like.
 * @returns A promise resolving to a message response indicating successful like addition.
 */
export const addLike = async (blogId: string, userId: string) => {
  await LikeModel.create({ user_id: userId, blog_id: blogId });
  return {
    status: 200,
    message: "Blog liked successfully. 🎉",
  };
};

/**
 * Removes a like by matching the blog ID and user ID.
 * @param blogId - The ID of the blog from which the like is to be removed.
 * @param userId - The ID of the user making the removal request.
 * @returns A promise resolving to a message response indicating successful like removal.
 */
export const removeLike = async (blogId: string, userId: string) => {
  await LikeModel.destroy({ where: { user_id: userId, blog_id: blogId } });
  return {
    message: "Like removed successfully. 🎉",
    status: 200,
  };
};

/**
 * Retrieves the count of likes for a specific blog.
 * @param blogId - The ID of the blog for which likes count is to be retrieved.
 * @returns A promise resolving to a message response with the likes count.
 */
export const getBlogLikesCount = async (blogId: string) => {
  const data = await LikeModel.count({ where: { blog_id: blogId } });
  return {
    status: 200,
    data: data,
  };
};

/**
 * Checks if a like exists for a specific blog and user.
 * @param blogId - The ID of the blog to check for the like.
 * @param userId - The ID of the user to check for the like.
 * @returns A promise resolving to a boolean indicating whether the like exists.
 */
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
