import Joi from "joi";

export const postSchemaValidator = Joi.object({
  content: Joi.string().min(1).max(20).required(),
  linkUrl: Joi.string().uri().required(),
  userId: Joi.string().min(1).max(10).required(),
});
