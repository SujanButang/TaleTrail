import Joi from "joi";

export const relationshipSchema = Joi.object({
  followingId: Joi.string().required().messages({
    "any.required": "User id is required ! ☹️",
  }),
});

export const followerSchema = Joi.object({
  userId: Joi.string().required().messages({
    "any.required": "User id is required ! ☹️",
  }),
});

export const checkRelationSchema = Joi.object({
  authorId: Joi.string().required().messages({
    "any.required": "Author id is required ! ☹️",
  }),
});
