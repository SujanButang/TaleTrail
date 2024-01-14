import NotFoundError from "../errors/notFoundError";
import { PaginationQuery } from "../interfaces/pagination";
import { IUserDataResponse } from "../interfaces/responseInterface";
import { UserModel } from "../models/UserModel";
import { getPaginationOptions } from "../utils/pagination";

export const getMyDetails = async (
  userId: string
): Promise<IUserDataResponse> => {
  const myDetails = await UserModel.findByPk(userId);
  if (!myDetails) throw new NotFoundError("User not found! ☹️");
  return {
    id: userId,
    username: myDetails.username,
    email: myDetails.email,
    profileImage: myDetails.profile_image,
  };
};

export const getUsers = async (query: PaginationQuery) => {
  const { page, size } = query;
  const pageDetails = getPaginationOptions({ page, size });

  const selectedColumns = ["id", "username", "bio", "profile_image"];
  const users = await UserModel.findAll({
    attributes: selectedColumns,
    limit: pageDetails.limit,
  });
  if (users.length == 0) throw new NotFoundError("Users empty! ☹️");
  return {
    users,
    status: 200,
  };
};

export const getUserById = async (userId: string) => {
  const selectedColumns = ["username", "bio", "profile_image"];
  const user = await UserModel.findOne({
    where: {
      id: userId,
    },
    attributes: selectedColumns,
  });
  return { status: 200, user: user };
};

export const updateUser = async (
  userId: string,
  username: string,
  profile_image: string,
  bio: string
) => {
  const user = await UserModel.findOne({ where: { id: userId } });
  if (!user) throw new NotFoundError("User not found! ☹️");
  user.username = username;
  user.profile_image = profile_image;
  user.bio = bio;
  await user.save();
  return { status: 200, message: "Profile updated successfully! 🎉" };
};
