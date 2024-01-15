import { CommentModel } from "../models/CommentModel";
import { UserModel } from "../models/UserModel";

/**
 * Adds a new comment to a specific blog by a user.
 * @param blogId - The ID of the blog to which the comment is added.
 * @param userId - The ID of the user adding the comment.
 * @param comment - The content of the comment.
 * @returns A promise resolving to a message response indicating successful comment addition.
 */
export const addComment = async (
  blogId: string,
  userId: string,
  comment: string
) => {
  await CommentModel.create({
    blog_id: blogId,
    user_id: userId,
    comment: comment,
  });
  return { status: 200, message: "Comment added successfully 🎉" };
};

/**
 * Removes a comment by its ID, ensuring the requester is the author.
 * @param commentId - The ID of the comment to be removed.
 * @param userId - The ID of the user making the removal request.
 * @returns A promise resolving to a message response indicating successful comment removal.
 */

export const removeComment = async (commentId: string, userId: string) => {
  await CommentModel.destroy({ where: { id: commentId, user_id: userId } });
  return { status: 200, message: "Comment removed. 🎉" };
};

/**
 * Retrieves all comments for a specific blog, including user details for each commenter.
 * @param blogId - The ID of the blog for which comments are to be retrieved.
 * @returns A promise resolving to a message response with the list of comments.
 */
export const getAllComments = async (blogId: string) => {
  const comments = await CommentModel.findAll({
    where: { blog_id: blogId },
    include: {
      model: UserModel,
      attributes: ["id", "username", "profile_image"],
    },
  });
  return { status: 200, comments: comments };
};
