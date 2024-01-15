import Joi from "joi";

export const readingListSchema = Joi.object({
  blogId: Joi.string().required().messages({
    "any.required": "Blog id is required ! ☹️",
  }),
});
