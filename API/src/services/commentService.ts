import { CommentModel } from "../models/CommentModel";
import { UserModel } from "../models/UserModel";

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

export const removeComment = async (commentId: string, userId: string) => {
  await CommentModel.destroy({ where: { id: commentId, user_id: userId } });
  return { status: 200, message: "Comment removed. 🎉" };
};

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
