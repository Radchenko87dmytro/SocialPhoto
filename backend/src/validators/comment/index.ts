import Joi from "joi";

export const commentSchemaValidator = Joi.object({
  content: Joi.string().min(1).max(20).required(),

  commentId: Joi.string().min(1).max(10).required(),
});
