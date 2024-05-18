import { Schema, model } from "mongoose";
import { CommentType } from "../../types";

export const commentSchema = new Schema<CommentType>(
  {
    id: { type: String, require: true },
    content: { type: String, require: true },
    commentId: { type: String, require: true },
    createdAt: { type: String, required: false },
    updatedAt: { type: String, required: false },
  },
  { collection: "comments", virtuals: true }
);

commentSchema.pre("save", function (next) {
  const today = new Date().toLocaleString("en-GB");
  if (!this.createdAt) this.createdAt = today;
  this.updatedAt = today;
  next();
});

export const commentModel = model<CommentType>("Comment", commentSchema);
