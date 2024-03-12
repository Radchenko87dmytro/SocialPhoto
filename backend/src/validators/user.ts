import Joi from "joi";
import { Express, Request, Response, NextFunction } from "express";

export const userSchemaValidator = Joi.object({
  id: Joi.string().guid(),

  username: Joi.string().alphanum().min(3).max(30).required(),

  email: Joi.string().email({ minDomainSegments: 2 }), // make refactoring com, net

  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),

  repeat_password: Joi.ref("password"),

  profileUrl: Joi.string(),

  bio: Joi.string().min(10).max(100),
});

export const userValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(req);
    const value = userSchemaValidator.validateAsync(req.body);
    next();
  } catch (error) {
    return res.status(403).json({ message: "Server Error", error });
  }
};

// "dev": "nodemon --watch 'src/**' --ext 'ts,json' --ignore 'src/**/*.spec.ts' --exec 'ts-node src/index.ts'",
