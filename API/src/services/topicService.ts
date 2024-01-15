import NotFoundError from "../errors/notFoundError";
import { PaginationQuery } from "../interfaces/pagination";
import { IMessageResponse } from "../interfaces/responseInterface";
import { TopicModel, newTopic } from "../models/TopicModel";
import { getPaginationOptions } from "../utils/pagination";

/**
 * Adds a new topic to the system.
 * @param topic - The name of the topic to be added.
 * @returns A promise resolving to a message response indicating successful addition of the topic.
 */
export const addTopic = async (topic: string): Promise<IMessageResponse> => {
  await newTopic(topic);
  return { message: "Topic added successfully. 🎉", status: 200 };
};

/**
 * Retrieves a paginated list of all topics available in the system.
 * @param query - The pagination query parameters (page and size).
 * @returns A promise resolving to a message response with the list of topics.
 * @throws NotFoundError if no topics are found.
 */
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
