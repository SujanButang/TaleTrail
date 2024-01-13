import NotFoundError from "../errors/notFoundError";
import { IBlog } from "../interfaces/blogInterface";
import { PaginationQuery } from "../interfaces/pagination";
import { IMessageResponse } from "../interfaces/responseInterface";
import { BlogModel } from "../models/BlogModel";
import { LikeModel } from "../models/LikeModel";
import { TopicModel } from "../models/TopicModel";
import { UserModel } from "../models/UserModel";
import { getPaginationOptions } from "../utils/pagination";

export const createBlog = async (blog: IBlog): Promise<IMessageResponse> => {
  await BlogModel.create({
    title: blog.title,
    description: blog.description,
    cover_image: blog.cover_image,
    topic: blog.topic,
    content: blog.content,
    author_id: blog.author,
  });
  return {
    message: "New blog successfully added. 🎉",
    status: 200,
  };
};
export const getAllBlogs = async (query: PaginationQuery) => {
  const { page, size } = query;
  const pageDetails = getPaginationOptions({ page, size });

  const selectedColumns = [
    "id",
    "title",
    "description",
    "cover_image",
    "topic",
    "created_at",
  ];

  const blogs = await BlogModel.findAll({
    attributes: selectedColumns,
    offset: pageDetails.offset,
    limit: pageDetails.limit,
    include: [
      {
        model: UserModel, // Assuming this is your UserModel
        attributes: ["username", "profile_image"],
      },
      {
        model: TopicModel,
        attributes: ["topic"],
      },
    ],
  });

  if (blogs.length === 0) throw new NotFoundError("Blogs list empty");
  return { blogs, status: 200 };
};

export const getBlogById = async (id: string) => {
  const data = await BlogModel.findOne({
    where: { id },
    include: [
      {
        model: UserModel, // Assuming this is your UserModel
        attributes: ["id", "username", "profile_image"],
      },
    ],
  });
  if (!data) throw new NotFoundError("Blog with the provided id not found! ☹️");
  return { data, status: 200 };
};

export const getUserBlog = async (userId: string) => {
  const selectedColumns = [
    "id",
    "title",
    "description",
    "cover_image",
    "created_at",
  ];

  const blogs = await BlogModel.findAll({
    where: { author_id: userId },

    attributes: selectedColumns,
    limit: 4,
    include: [
      {
        model: UserModel, // Assuming this is your UserModel
        attributes: ["id","username", "profile_image"],
      },
      {
        model: LikeModel,
      },
    ],
  });
  if (blogs.length === 0) throw new NotFoundError("Blogs list empty");
  return { blogs, status: 200 };
};
