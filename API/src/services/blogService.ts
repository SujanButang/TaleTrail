import { IBlog } from "../interfaces/blogInterface";
import { IMessageResponse } from "../interfaces/responseInterface";
import { BlogModel } from "../models/BlogModel";

export const createBlog = async (blog: IBlog): Promise<IMessageResponse> => {
  console.log(blog)
  await BlogModel.create({
    ...blog,
  });
  return {
    message: "New blog successfully added. 🎉",
    status: 200,
  };
};
