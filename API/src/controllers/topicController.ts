import { NextFunction, Request, Response } from "express";
import { addTopic, getAllTopics } from "../services/topicService";
import { PaginationQuery } from "../interfaces/pagination";


/**
 * Handles the creation of a new topic.
 * @param req - The Express request object containing the new topic details.
 * @param res - The Express response object to send the result.
 * @param next - The Express next function to handle errors.
 */
export const handleNewTopic = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { topic } = req.body;
    const data = await addTopic(topic);
    res.status(data.status).json(data.message);
  } catch (error) {
    next(error);
  }
};

/**
 * Handles the retrieval of all topics based on optional pagination parameters.
 * @param req - The Express request object containing optional pagination query parameters.
 * @param res - The Express response object to send the result.
 * @param next - The Express next function to handle errors.
 */
export const handleGetAllTopics = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const query = req.query;
    const data = await getAllTopics(query as unknown as PaginationQuery);
    res.status(data.status).json(data.topics);
  } catch (error) {
    next(error);
  }
};
