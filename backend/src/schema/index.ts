import { Schema, model } from "mongoose";
import { UserType } from "../types";

export const userSchema = new Schema<UserType>(
  {
    
    username: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    profileUrl: { type: String, require: false },
    bio: { type: String, require: true },
    createdAt: { type: String, required: false },
    updatedAt: { type: String, required: false },
  },
  { collection: "users", virtuals: true }
);

userSchema.pre("save", function (next) {
  const today = new Date().toLocaleString("en-GB");
  if (!this.createdAt) this.createdAt = today;
  this.updatedAt = today;
  next();
});

// 3. Create a Model.
export const userModel = model<UserType>("User", userSchema);
