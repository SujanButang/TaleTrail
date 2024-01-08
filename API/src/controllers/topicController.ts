import { NextFunction, Request, Response } from "express";
import { addTopic } from "../services/topicService";

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
