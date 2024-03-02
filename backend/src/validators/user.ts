const Joi = require("joi");

export const userSchemaValidator = Joi.object({
  id: Joi.string().guid(),

  username: Joi.string().alphanum().min(3).max(30).required(),

  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }) // make refactoring com, net
    .with("username")
    .xor("password")
    .with("password", "repeat_password"),

  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),

  repeat_password: Joi.ref("password"),

  profileUrl: Joi.string().pattern(new RegExp("^https?://S+/.test(url)")),

  bio: Joi.string().min(10).max(100),
});

const userData = {
  username: "john",
  email: "john@example.com",
  password: "123",
  profileUrl: "https://example.com",
  bio: "Lorem ipsum dolor.",
};

try {
  const value = userSchemaValidator.validateAsync(userData);
  console.log("Validated data:", value);
} catch (error) {
  console.error("Validation error:", error);
}
