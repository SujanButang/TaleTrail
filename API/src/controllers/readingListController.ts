import { NextFunction, Request, Response } from "express";
import {
  AddBlogToList,
  blogExistsInReadingList,
  getUsersReadingList,
  removeFromReadingList,
} from "../services/readingListService";
import NotFoundError from "../errors/notFoundError";

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
