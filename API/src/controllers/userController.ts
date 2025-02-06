import { NextFunction, Request, Response } from "express";
import {
  getMyDetails,
  getUserById,
  getUsers,
  updateUser,
} from "../services/userService";
import UnauthenticatedError from "../errors/UnauthenticatedError";
import { PaginationQuery } from "../interfaces/pagination";

/**
 * Handles the retrieval of details for the currently authenticated user.
 * Requires the user to be signed in.
 * @param req - The Express request object.
 * @param res - The Express response object to send the result.
 * @param next - The Express next function to handle errors.
 */
export const handleGetMyDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = res.locals.user.userId;
    if (!user) throw new UnauthenticatedError("User not signed in! ☹️");
    const data = await getMyDetails(user);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

/**
 * Handles the retrieval of users based on optional pagination parameters.
 * @param req - The Express request object containing optional pagination query parameters.
 * @param res - The Express response object to send the result.
 * @param next - The Express next function to handle errors.
 */
export const handleGetUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const query = req.query;
    const users = await getUsers(query as unknown as PaginationQuery);
    res.status(users.status).json(users.users);
  } catch (error) {
    next(error);
  }
};

/**
 * Handles the retrieval of details for a specific user by their ID.
 * @param req - The Express request object containing the user ID.
 * @param res - The Express response object to send the result.
 * @param next - The Express next function to handle errors.
 */
export const handleSingleUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.query;
    const user = await getUserById(userId as string);
    res.status(user.status).json(user.user);
  } catch (error) {
    next(error);
  }
};


/**
 * Handles the update of the authenticated user's profile details.
 * Requires the user to be signed in.
 * @param req - The Express request object containing the updated profile details.
 * @param res - The Express response object to send the result.
 * @param next - The Express next function to handle errors.
 */
export const handleUpdateProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = res.locals.user.userId;
    const { username, profile_image, bio } = req.body;
    const data = await updateUser(userId, username, profile_image, bio);
    res.status(data.status).json(data.message);
  } catch (error) {
    next(error);
  }
};
