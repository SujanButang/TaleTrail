import { NextFunction, Request, Response } from "express";
import {
  addLike,
  getBlogLikesCount,
  likeExists,
  removeLike,
} from "../services/likeService";


/**
 * Handles the addition or removal of a like for a specific blog by the logged-in user.
 * Checks if the user has already liked the blog and toggles the like accordingly.
 * @param req - The Express request object containing the blog ID.
 * @param res - The Express response object to send the result.
 * @param next - The Express next function to handle errors.
 */
export const handleAddLike = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = res.locals.user.userId;
    const { blogId } = req.query;
    const likeExist = await likeExists(blogId as string, userId);
    if (likeExist) {
      const data = await removeLike(blogId as string, userId);
      res.status(data.status).json(data.message);
    } else {
      const data = await addLike(blogId as string, userId);
      res.status(data.status).json(data.message);
    }
  } catch (error) {
    next(error);
  }
};


/**
 * Handles the retrieval of the total count of likes for a specific blog.
 * @param req - The Express request object containing the blog ID.
 * @param res - The Express response object to send the result.
 * @param next - The Express next function to handle errors.
 */
export const handleGetBlogLikesCount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { blogId } = req.query;
    const count = await getBlogLikesCount(blogId as string);
    res.status(count.status).json(count.data);
  } catch (error) {
    next(error);
  }
};

/**
 * Handles the check for whether the logged-in user has liked a specific blog.
 * @param req - The Express request object containing the blog ID.
 * @param res - The Express response object to send the result.
 * @param next - The Express next function to handle errors.
 */
export const handleHasLike = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { blogId } = req.query;
    const userId = res.locals.user.userId;
    const data = await likeExists(blogId as string, userId);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};
