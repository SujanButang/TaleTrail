import NotFoundError from "../errors/notFoundError";
import { IUserDataResponse } from "../interfaces/responseInterface";
import { UserModel } from "../models/UserModel";

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
