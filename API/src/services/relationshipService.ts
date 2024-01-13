import { RelationshipModel } from "../models/RelationshipModel";
import { UserModel } from "../models/UserModel";

export const addRelationship = async (follower: string, following: string) => {
  await RelationshipModel.create({
    follower_id: follower,
    following_id: following,
  });
  return { status: 200, message: "Started following. 🎉" };
};

export const removeRelationship = async (
  follower: string,
  following: string
) => {
  await RelationshipModel.destroy({
    where: {
      follower_id: follower,
      following_id: following,
    },
  });
  return { status: 200, message: "Stopped following. 🎉" };
};

export const getFollowers = async (userId: string) => {
  const followers = await RelationshipModel.findAll({
    where: {
      following_id: userId,
    },
    include: {
      model: UserModel,
      as: "follower",
      attributes: ["id", "bio", "username", "email", "profile_image"],
    },
    attributes: ["id"],
  });
  return { status: 200, followers };
};

export const getFollowings = async (userId: string) => {
  const followings = await RelationshipModel.findAll({
    where: {
      follower_id: userId,
    },
    include: {
      model: UserModel,
      as: "following",
      attributes: ["id", "bio", "username", "email", "profile_image"],
    },
    attributes: ["id"],
  });
  return { status: 200, followings };
};

export const relationshipExists = async (
  follower: string,
  following: string
) => {
  const relation = await RelationshipModel.findOne({
    where: {
      follower_id: follower,
      following_id: following,
    },
  });
  if (relation) return true;
  return false;
};
