import Joi from "joi";
import { Express, Request, Response, NextFunction } from "express";

export const userSchemaValidator = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),

  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: true } })
    .pattern(/^[^s@]+@[^s@]+.[^s@]+$/), //tlds: { allow: true } pozwala na dowolne rozszerzenia domenowe (top-level domains)

  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),

  repeat_password: Joi.ref("password"),

  profileUrl: Joi.string(),

  bio: Joi.string().min(10).max(100),
});

// "dev": "nodemon --watch 'src/**' --ext 'ts,json' --ignore 'src/**/*.spec.ts' --exec 'ts-node src/index.ts'",
