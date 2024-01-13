import { BlogModel } from "../models/BlogModel";
import { ReadingListModel } from "../models/ReadingListModel";
import { UserModel } from "../models/UserModel";

export const AddBlogToList = async (blogId: string, userId: string) => {
  await ReadingListModel.create({ blogId: blogId, userId: userId });
  return {
    message: "Blog saved to reading list. 🎉",
    status: 200,
  };
};

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
      },
      {
        model: UserModel,
        attributes: ["username", "profile_image"],
      },
    ],
  });
  return { status: 200, data: data };
};

export const removeFromReadingList = async (userId: string, blogId: string) => {
  await ReadingListModel.destroy({ where: { userId, blogId } });
  return { message: "Removed from reading list. 🎉", status: 200 };
};

export const blogExistsInReadingList = async (
  blogId: string,
  userId: string
) => {
  const data = await ReadingListModel.findOne({ where: { blogId, userId } });
  if (data) return true;
  return false;
};
