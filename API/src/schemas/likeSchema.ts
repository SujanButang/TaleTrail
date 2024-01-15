import Joi from "joi";

export const newLikeSchema = Joi.object({
  blogId: Joi.string().required().messages({
    "any.required": "Blog id is required! ☹️",
  }),
});
