import { BlogModel } from "../models/BlogModel";
import { ReadingListModel } from "../models/ReadingListModel";
import { UserModel } from "../models/UserModel";


/**
 * Adds a blog to the user's reading list.
 * @param blogId - The ID of the blog to be added to the reading list.
 * @param userId - The ID of the user adding the blog to the reading list.
 * @returns A promise resolving to a message response indicating successful addition to the reading list.
 */
export const AddBlogToList = async (blogId: string, userId: string) => {
  await ReadingListModel.create({ blogId: blogId, userId: userId });
  return {
    message: "Blog saved to reading list. 🎉",
    status: 200,
  };
};

/**
 * Retrieves the user's reading list, including detailed information about each blog.
 * @param userId - The ID of the user whose reading list is to be retrieved.
 * @returns A promise resolving to a message response with the user's reading list data.
 */
export const getUsersReadingList = async (userId: string) => {
  const data = await ReadingListModel.findAll({
    where: { userId },
    include: [
      {
        model: BlogModel,
        attributes: [
          "id",
          "title",
          "cover_image",
          "description",
          "topic",
          "created_at",
        ],
        include: [
          {
            model: UserModel,
            attributes: ["id", "username", "profile_image"],
          },
        ],
      },
    ],
  });
  return { status: 200, data: data };
};

/**
 * Removes a blog from the user's reading list.
 * @param userId - The ID of the user removing the blog from the reading list.
 * @param blogId - The ID of the blog to be removed from the reading list.
 * @returns A promise resolving to a message response indicating successful removal from the reading list.
 */
export const removeFromReadingList = async (userId: string, blogId: string) => {
  await ReadingListModel.destroy({ where: { userId, blogId } });
  return { message: "Removed from reading list. 🎉", status: 200 };
};

/**
 * Checks if a blog exists in the user's reading list.
 * @param blogId - The ID of the blog to check for existence in the reading list.
 * @param userId - The ID of the user whose reading list is being checked.
 * @returns A promise resolving to a boolean indicating whether the blog exists in the reading list.
 */
export const blogExistsInReadingList = async (
  blogId: string,
  userId: string
) => {
  const data = await ReadingListModel.findOne({ where: { blogId, userId } });
  if (data) return true;
  return false;
};
