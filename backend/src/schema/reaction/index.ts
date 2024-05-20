import { Schema, model } from "mongoose";
import { ReactionType } from "../../types";

export const reactionSchema = new Schema<ReactionType>(
  {
    id: { type: String, require: true },
    content: { type: String, require: true },
    postId: { type: String, require: true },
    commentId: { type: String, require: true },
    userId: { type: String, require: true },
    reactionType: { type: Number, require: true },
    parentType: { type: String, require: true },
    createdAt: { type: String, required: false },
    updatedAt: { type: String, required: false },
  },
  { collection: "reactions", virtuals: true }
);

reactionSchema.pre("save", function (next) {
  const today = new Date().toLocaleString("en-GB");
  if (!this.createdAt) this.createdAt = today;
  this.updatedAt = today;
  next();
});

export const reactionModel = model<ReactionType>("Reaction", reactionSchema);
