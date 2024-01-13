import { NextFunction, Request, Response } from "express";
import { addTopic, getAllTopics } from "../services/topicService";
import { PaginationQuery } from "../interfaces/pagination";

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
