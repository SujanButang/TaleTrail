import { NextFunction, Response, Request } from "express";
import { IBlogRequest } from "../interfaces/blogInterface";
import {
  createBlog,
  deleteBlog,
  getAllBlogs,
  getBlogById,
  getUserBlog,
} from "../services/blogService";
import UnauthenticatedError from "../errors/UnauthenticatedError";
import { getTopicId, topicExists } from "../models/TopicModel";
import { addTopic } from "../services/topicService";
import { PaginationQuery } from "../interfaces/pagination";

/**
 * Handles the creation of a new blog, ensuring the associated topic exists.
 * If the topic doesn't exist, it adds the topic first.
 * Requires the user to be logged in.
 * @param req - The Express request object containing the new blog details.
 * @param res - The Express response object to send the result.
 * @param next - The Express next function to handle errors.
 */
export const handleNewBlog = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { blog } = req.body;
    const user = res.locals.user.userId;
    const topicExist = await topicExists(blog.topic);
    if (!topicExist) {
      await addTopic(blog.topic);
    }
    blog.topic = await getTopicId(blog.topic);

    if (!user) throw new UnauthenticatedError("User not logged in! ☹️");
    const data = await createBlog({ ...blog, author: user as string });
    res.status(data.status).json(data.message);
  } catch (error) {
    next(error);
  }
};

/**
 * Handles the retrieval of all blogs based on optional pagination parameters.
 * @param req - The Express request object containing optional pagination query parameters.
 * @param res - The Express response object to send the result.
 * @param next - The Express next function to handle errors.
 */
export const handleGetAllBlogs = async (
  req: IBlogRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const query = req.query;

    const blogs = await getAllBlogs(query as unknown as PaginationQuery);
    res.status(blogs.status).json(blogs.blogs);
  } catch (error) {
    next(error);
  }
};

/**
 * Handles the retrieval of a single blog by its ID.
 * @param req - The Express request object containing the blog ID.
 * @param res - The Express response object to send the result.
 * @param next - The Express next function to handle errors.
 */
export const handleGetSingleBlog = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { blogId } = req.query;
    const data = await getBlogById(blogId as string);
    res.status(data.status).json(data.data);
  } catch (error) {
    next(error);
  }
};

/**
 * Handles the retrieval of blogs associated with a specific user.
 * @param req - The Express request object containing the user ID.
 * @param res - The Express response object to send the result.
 * @param next - The Express next function to handle errors.
 */
export const handleUserBlog = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.query;
    const data = await getUserBlog(userId as string);
    res.status(data.status).json(data.blogs);
  } catch (error) {
    next(error);
  }
};

/**
 * Handles the deletion of a blog by its ID, ensuring the requesting user has the necessary permissions.
 * Requires the user to be logged in.
 * @param req - The Express request object containing the blog ID.
 * @param res - The Express response object to send the result.
 * @param next - The Express next function to handle errors.
 */
export const handleDeletBlog = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = res.locals.user.userId;
    const { blogId } = req.query;
    const data = await deleteBlog(blogId as string, userId);
    res.status(data.status).json(data.message);
  } catch (error) {
    next(error);
  }
};
