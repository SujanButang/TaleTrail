import NotFoundError from "../errors/notFoundError";
import { IBlog } from "../interfaces/blogInterface";
import { PaginationQuery } from "../interfaces/pagination";
import { IMessageResponse } from "../interfaces/responseInterface";
import { BlogModel } from "../models/BlogModel";
import { UserModel } from "../models/UserModel";
import { getPaginationOptions } from "../utils/pagination";

export const createBlog = async (blog: IBlog): Promise<IMessageResponse> => {
  console.log(blog);
  await BlogModel.create({
    title: blog.title,
    description: blog.description,
    cover_image: blog.coverImage,
    topic: blog.topic,
    content: blog.content,
    author: blog.author,
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
    ],
  });

  if (blogs.length === 0) throw new NotFoundError("Blogs list empty");
  return { blogs, status: 200 };
};
