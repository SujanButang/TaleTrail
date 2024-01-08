import { NextFunction, Response } from "express";
import { IBlogRequest } from "../interfaces/blogInterface";
import { createBlog } from "../services/blogService";
import UnauthenticatedError from "../errors/unAuthenticatedError";

export const handleNewBlog = async (
  req: IBlogRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { blog } = req.body;
    const user = res.locals.user.userId;
    if (!user) throw new UnauthenticatedError("User not logged in! ☹️");
    const data = await createBlog({ ...blog, author: user as string });
    res.status(data.status).json(data.message);
  } catch (error) {
    next(error);
  }
};
