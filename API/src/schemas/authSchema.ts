import Joi from "joi";

export const emailSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "any.required": "Email is required",
    "string.email": "Email must be a valid email",
  }),
});

export const otpSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "any.required": "Email is required",
    "string.email": "Email must be a valid email",
  }),
  otp: Joi.number().required().messages({
    "any.required": "Otp is required! ☹️",
  }),
});

export const signupSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "any.required": "Email is required",
    "string.email": "Email must be a valid email",
  }),
  username: Joi.string()
    .required()
    .min(3)
    .max(20)
    .pattern(new RegExp("^[a-zA-Z0-9]{3,20}$"))
    .messages({
      "any.required": "Username is required",
      "string.min": "Username must be at least 3 characters long",
      "string.max": "Username must be at most 20 characters long",
      "string.pattern.base":
        "Username must only contain alphanumeric characters",
    }),
  password: Joi.string().required().min(8).messages({
    "any.required": "Password is required",
    "string.min": "Password must be at least 8 characters long",
  }),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "any.required": "Email is required",
    "string.email": "Email must be a valid email",
  }),
  password: Joi.string().required().min(8).messages({
    "any.required": "Password is required",
    "string.min": "Password must be at least 8 characters long",
  }),
});
