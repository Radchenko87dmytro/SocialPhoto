import Joi from "joi";

export const reactionSchemaValidator = Joi.object({
  content: Joi.string().min(1).max(20).required(),

  userId: Joi.string().min(1).max(10).required(),
});
