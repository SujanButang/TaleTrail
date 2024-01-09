import { NextFunction, Request, Response } from "express";
import { getMyDetails } from "../services/userService";
import UnauthenticatedError from "../errors/unAuthenticatedError";


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
