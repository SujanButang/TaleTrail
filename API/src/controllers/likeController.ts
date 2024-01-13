import { NextFunction, Request, Response } from "express";
import {
  addLike,
  getBlogLikesCount,
  likeExists,
  removeLike,
} from "../services/likeService";

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
