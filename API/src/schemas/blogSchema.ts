import Joi from "joi";

export const blogSchema = Joi.object({
  blog: Joi.object({
    title: Joi.string().required().min(5).messages({
      "any.required": "Title is required! ☹️",
      "string.min": "Title must be at least 5 letters!☹️",
    }),
    description: Joi.string().required().min(10).messages({
      "any.required": "Description is required! ☹️",
      "string.min": "Description must be at least 10 letters!☹️",
    }),
    cover_image: Joi.string().required().messages({
      "any.required": "Cover image is required! ☹️",
    }),
    topic: Joi.string().required().messages({
      "any.required": "Topic is required!",
    }),
    content: Joi.array().required().messages({
      "any.required": "Content is required!",
    }),
  }),
});

export const getSingleBlogSchema = Joi.object({
  blogId: Joi.string().required().messages({
    "any.required": "Blog id is required! ☹️",
  }),
});

export const getUserBlogSchema = Joi.object({
  userId: Joi.string().required().messages({
    "any:required": "User id is required! ☹️",
  }),
});

export const getDeleteBlogSchema = Joi.object({
  blogId: Joi.string().required().messages({
    "any.required": "Blog id is required! ☹️",
  }),
});
