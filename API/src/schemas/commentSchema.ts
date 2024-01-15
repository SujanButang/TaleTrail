import Joi from "joi";

export const newCommentBodySchema = Joi.object({
  comment: Joi.string().required().messages({
    "any.required": "Comment content is required! ☹️",
  }),
});

export const newCommentQuerySchema = Joi.object({
  blogId: Joi.string().required().messages({
    "any.required": "Blog id is required! ☹️",
  }),
});

export const deleteCommentSchema = Joi.object({
  commentId: Joi.string().required().messages({
    "any.required": "Comment id is required! ☹️",
  }),
});
