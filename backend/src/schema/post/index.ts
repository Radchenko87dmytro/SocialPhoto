import { Schema, model } from "mongoose";
import { PostType } from "../../types";

export const postSchema = new Schema<PostType>(
  {
    id: { type: String, require: true },
    linkUrl: { type: String, require: true },
    content: { type: String, require: true },
    createdAt: { type: String, required: false },
    updatedAt: { type: String, required: false },
  },
  { collection: "posts", virtuals: true }
);

postSchema.pre("save", function (next) {
  const today = new Date().toLocaleString("en-GB");
  if (!this.createdAt) this.createdAt = today;
  this.updatedAt = today;
  next();
});

export const postModel = model<PostType>("Post", postSchema);

// link do zdjenca
// tresc content
//id
//data stworzenia
