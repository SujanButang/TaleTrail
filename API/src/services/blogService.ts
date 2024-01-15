import NotFoundError from "../errors/notFoundError";
import { IBlog } from "../interfaces/blogInterface";
import { PaginationQuery } from "../interfaces/pagination";
import { IMessageResponse } from "../interfaces/responseInterface";
import { BlogModel } from "../models/BlogModel";
import { LikeModel } from "../models/LikeModel";
import { TopicModel } from "../models/TopicModel";
import { UserModel } from "../models/UserModel";
import { getPaginationOptions } from "../utils/pagination";

/**
 * Creates a new blog entry with the provided details.
 * @param blog - The blog object containing title, description, cover image, topic, content, and author ID.
 * @returns A promise resolving to a message response indicating successful blog creation.
 */
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

/**
 * Retrieves a paginated list of blogs along with their authors and topics.
 * @param query - The pagination query parameters.
 * @returns A promise resolving to a message response with the list of blogs.
 * @throws NotFoundError if the blogs list is empty.
 */
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
        attributes: ["username", "profile_image", "id"],
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

/**
 * Retrieves details for a specific blog by its ID, including the author's information.
 * @param id - The ID of the blog to retrieve.
 * @returns A promise resolving to a message response with the blog details.
 * @throws NotFoundError if the blog with the provided ID is not found.
 */
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

  /**
   * Retrieves a paginated list of blogs authored by a specific user, along with their likes.
   * @param userId - The ID of the user whose blogs are to be retrieved.
   * @returns A promise resolving to a message response with the list of user's blogs.
   * @throws NotFoundError if the user's blogs list is empty.
   */
  const blogs = await BlogModel.findAll({
    where: { author_id: userId },

    attributes: selectedColumns,
    include: [
      {
        model: UserModel, // Assuming this is your UserModel
        attributes: ["id", "username", "profile_image"],
      },
      {
        model: LikeModel,
      },
    ],
  });
  if (blogs.length === 0) throw new NotFoundError("Blogs list empty");
  return { blogs, status: 200 };
};

/**
 * Deletes a blog entry by its ID, ensuring the requester is the author.
 * @param blogId - The ID of the blog to be deleted.
 * @param userId - The ID of the user making the deletion request.
 * @returns A promise resolving to a message response indicating successful blog deletion.
 */
export const deleteBlog = async (blogId: string, userId: string) => {
  await BlogModel.destroy({
    where: {
      id: blogId,
      author_id: userId,
    },
  });
  return { status: 200, message: "Blog has been deleted successfully. 🎉" };
};
