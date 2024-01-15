import { NextFunction, Request, Response } from "express";
import {
  addComment,
  getAllComments,
  removeComment,
} from "../services/commentService";

/**
 * Handles the addition of a new comment to a blog.
 * Requires the user to be logged in.
 * @param req - The Express request object containing the blog ID and comment details.
 * @param res - The Express response object to send the result.
 * @param next - The Express next function to handle errors.
 */
export const handleAddComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = res.locals.user.userId;
    const { blogId } = req.query;
    const { comment } = req.body;
    const data = await addComment(blogId as string, userId, comment);
    res.status(data.status).json(data.message);
  } catch (error) {
    next(error);
  }
};

/**
 * Handles the removal of a comment by its ID.
 * Requires the user to be logged in and have the necessary permissions.
 * @param req - The Express request object containing the comment ID.
 * @param res - The Express response object to send the result.
 * @param next - The Express next function to handle errors.
 */
export const handleRemoveComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { commentId } = req.query;
    const userId = res.locals.user.userId;
    const data = await removeComment(commentId as string,userId);
    res.status(data.status).json(data.message);
  } catch (error) {
    next(error);
  }
};


/**
 * Handles the retrieval of all comments associated with a specific blog.
 * @param req - The Express request object containing the blog ID.
 * @param res - The Express response object to send the result.
 * @param next - The Express next function to handle errors.
 */
export const handleGetAllComments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { blogId } = req.query;
    const data = await getAllComments(blogId as string);
    res.status(data.status).json(data.comments);
  } catch (error) {
    next(error);
  }
};
