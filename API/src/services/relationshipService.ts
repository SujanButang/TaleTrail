import { RelationshipModel } from "../models/RelationshipModel";
import { UserModel } from "../models/UserModel";

/**
 * Establishes a new relationship where the follower follows the following user.
 * @param follower - The ID of the user initiating the follow.
 * @param following - The ID of the user being followed.
 * @returns A promise resolving to a message response indicating successful relationship establishment.
 */
export const addRelationship = async (follower: string, following: string) => {
  await RelationshipModel.create({
    follower_id: follower,
    following_id: following,
  });
  return { status: 200, message: "Started following. 🎉" };
};

/**
 * Ends an existing relationship where the follower stops following the following user.
 * @param follower - The ID of the user initiating the unfollow.
 * @param following - The ID of the user being unfollowed.
 * @returns A promise resolving to a message response indicating successful relationship termination.
 */
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

/**
 * Retrieves a list of users who are followers of the specified user.
 * @param userId - The ID of the user whose followers are to be retrieved.
 * @returns A promise resolving to a message response with the list of followers.
 */
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

/**
 * Retrieves a list of users whom the specified user is following.
 * @param userId - The ID of the user whose followings are to be retrieved.
 * @returns A promise resolving to a message response with the list of followings.
 */
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

/**
 * Checks if a relationship exists between the specified follower and following.
 * @param follower - The ID of the follower user.
 * @param following - The ID of the following user.
 * @returns A promise resolving to a boolean indicating whether the relationship exists.
 */
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
