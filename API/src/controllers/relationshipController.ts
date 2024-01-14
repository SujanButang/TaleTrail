import { NextFunction, Request, Response } from "express";
import {
  addRelationship,
  getFollowers,
  getFollowings,
  relationshipExists,
  removeRelationship,
} from "../services/relationshipService";

export const handleNewRelation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { followingId } = req.query;
    const follower = res.locals.user.userId;
    const relationExist = await relationshipExists(
      follower,
      followingId as string
    );
    if (!relationExist) {
      const data = await addRelationship(follower, followingId as string);
      res.status(data.status).json(data.message);
    } else {
      const data = await removeRelationship(follower, followingId as string);
      res.status(data.status).json(data.message);
    }
  } catch (error) {
    next(error);
  }
};

export const handleGetFollowers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.query;
    const data = await getFollowers(userId as string);
    res.status(data.status).json(data.followers);
  } catch (error) {
    next(error);
  }
};

export const handleGetFollowings = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.query;
    const data = await getFollowings(userId as string);
    res.status(data.status).json(data.followings);
  } catch (error) {
    next(error);
  }
};

export const handleCheckRelation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = res.locals.user.userId;
    const { authorId } = req.query;
    const data = await relationshipExists(userId, authorId as string);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};
