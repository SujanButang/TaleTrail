import NotAcceptableError from "../errors/notAcceptableError";
import { IMessageResponse } from "../interfaces/responseInterface";
import { newTopic, topicExists } from "../models/TopicModel";

export const addTopic = async (topic: string): Promise<IMessageResponse> => {
  const topicExist = await topicExists(topic);
  if (topicExist)
    throw new NotAcceptableError("Topic already in database. ☹️");
  await newTopic(topic);
  return { message: "Topic added successfully. 🎉", status: 200 };
};
