import NotFoundError from "../errors/NotFoundError";
import { PaginationQuery } from "../interfaces/pagination";
import { IUserDataResponse } from "../interfaces/responseInterface";
import { UserModel } from "../models/UserModel";
import { getPaginationOptions } from "../utils/pagination";

/**
 * Retrieves details of the authenticated user.
 * @param userId - The ID of the authenticated user.
 * @returns A promise resolving to user data response including ID, username, email, profile image, and bio.
 * @throws NotFoundError if the user is not found.
 */
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
    bio: myDetails.bio,
  };
};

/**
 * Retrieves a paginated list of users.
 * @param query - The pagination query parameters (page and size).
 * @returns A promise resolving to a message response with the list of users.
 * @throws NotFoundError if no users are found.
 */
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

/**
 * Retrieves details of a user by their ID.
 * @param userId - The ID of the user to retrieve.
 * @returns A promise resolving to a message response with user details.
 */
export const getUserById = async (userId: string) => {
  const selectedColumns = ["username", "bio", "profile_image", "email"];
  const user = await UserModel.findOne({
    where: {
      id: userId,
    },
    attributes: selectedColumns,
  });
  return { status: 200, user: user };
};

/**
 * Updates the profile information of a user.
 * @param userId - The ID of the user to update.
 * @param username - The new username.
 * @param profile_image - The new profile image URL.
 * @param bio - The new biography.
 * @returns A promise resolving to a message response indicating successful profile update.
 * @throws NotFoundError if the user is not found.
 */
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
