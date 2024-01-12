import { IMessageResponse } from "../interfaces/responseInterface";
import { newTopic } from "../models/TopicModel";

export const addTopic = async (topic: string): Promise<IMessageResponse> => {
  await newTopic(topic);
  return { message: "Topic added successfully. 🎉", status: 200 };
};
