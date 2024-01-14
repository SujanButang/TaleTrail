import { NextFunction, Request, Response } from "express";
import {
  addComment,
  getAllComments,
  removeComment,
} from "../services/commentService";

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
    console.log(error)
    next(error);
  }
};

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
