import NotFoundError from "../errors/notFoundError";
import { PaginationQuery } from "../interfaces/pagination";
import { IMessageResponse } from "../interfaces/responseInterface";
import { TopicModel, newTopic } from "../models/TopicModel";
import { getPaginationOptions } from "../utils/pagination";

export const addTopic = async (topic: string): Promise<IMessageResponse> => {
  await newTopic(topic);
  return { message: "Topic added successfully. 🎉", status: 200 };
};

export const getAllTopics = async (query: PaginationQuery) => {
  const { page, size } = query;
  const pageDetails = getPaginationOptions({ page, size });
  const topics = await TopicModel.findAll({
    offset: pageDetails.offset,
    limit: pageDetails.limit,
  });

  if (topics.length === 0) throw new NotFoundError("Topics list empty");
  return { topics, status: 200 };
};
