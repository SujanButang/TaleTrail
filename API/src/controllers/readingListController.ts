import { NextFunction, Request, Response } from "express";
import {
  AddBlogToList,
  blogExistsInReadingList,
  getUsersReadingList,
  removeFromReadingList,
} from "../services/readingListService";
import NotFoundError from "../errors/notFoundError";

/**
 * Handles the addition or removal of a blog to/from the user's reading list.
 * Checks if the blog is already in the reading list and toggles its presence accordingly.
 * @param req - The Express request object containing the blog ID.
 * @param res - The Express response object to send the result.
 * @param next - The Express next function to handle errors.
 */
export const handleAddToReadingList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { blogId } = req.query;
    const userId = res.locals.user.userId;
    if (await blogExistsInReadingList(blogId as string, userId)) {
      const data = await removeFromReadingList(userId, blogId as string);
      res.status(data.status).json(data.message);
    } else {
      const data = await AddBlogToList(blogId as string, userId);
      res.status(data.status).json(data.message);
    }
  } catch (error) {
    next(error);
  }
};

/**
 * Handles the retrieval of blogs in the user's reading list.
 * Requires the user to be logged in.
 * @param req - The Express request object.
 * @param res - The Express response object to send the result.
 * @param next - The Express next function to handle errors.
 */
export const handleGetUserReadingList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = res.locals.user.userId;
    const data = await getUsersReadingList(userId);
    if (!data) throw new NotFoundError("no any blogs found! ☹️");
    res.status(data.status).json(data.data);
  } catch (error) {
    next(error);
  }
};

/**
 * Handles the removal of a blog from the user's reading list.
 * Requires the user to be logged in.
 * @param req - The Express request object containing the blog ID.
 * @param res - The Express response object to send the result.
 * @param next - The Express next function to handle errors.
 */
export const handleRemoveFromReadingList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { blogId } = req.query;
    const userId = res.locals.user.userId;
    const data = await removeFromReadingList(userId, blogId as string);
    res.status(data.status).json(data.message);
  } catch (error) {
    next();
  }
};
