import { NextFunction, Response, Request } from "express";
import { IBlogRequest } from "../interfaces/blogInterface";
import { createBlog, getAllBlogs, getBlogById } from "../services/blogService";
import UnauthenticatedError from "../errors/unAuthenticatedError";
import { getTopicId, topicExists } from "../models/TopicModel";
import { addTopic } from "../services/topicService";
import { PaginationQuery } from "../interfaces/pagination";

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

export const handleGetSingleBlog = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {blogId} = req.query;
    console.log(blogId);
    const data = await getBlogById(blogId as string);
    res.status(data.status).json(data.data);
  } catch (error) {
    next(error);
  }
};
