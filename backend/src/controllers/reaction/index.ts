import { reactionModel } from "./../../schema/reaction/index";
import { Request, Response } from "express";
import { postModel } from "../../schema/post";
import { databaseResponseParser, deepCopyParser } from "../../common";
import { ErrorType } from "../../types";
import { commentModel } from "../../schema/comment";

import { reactionSchemaValidator } from "../../validators/reaction";

class ReactionController {
  async createReaction(req: Request, res: Response) {
    try {
      const { content, parentId, commentId, userId } = req.body;

      const { error, value } = reactionSchemaValidator.validate(req.body);
      if (error) {
        console.log("Error message:", error.details[0].message);
        throw Error(error.details[0].message);
      }

      const newReaction = await reactionModel.create({
        content,
        parentId,
        commentId,
        userId,
      });
      console.log(newReaction);
      return res.status(200).json({
        message: "Reaction created succsessfully",
        data: databaseResponseParser(deepCopyParser(newReaction)),
      });
    } catch (e) {
      return res
        .status(500)
        .json({ message: "Server Error", data: (e as ErrorType).message });
    }
  }

  async getAllReactions(req: Request, res: Response) {
    try {
      let reactions = await reactionModel.find();
      return res.status(200).json({
        message: "Reactions gets succsessfully",
        data: databaseResponseParser(deepCopyParser(reactions)),
      });
    } catch (e) {
      return res
        .status(500)
        .json({ message: "Server Error", data: (e as ErrorType).message });
    }
  }

  async getReaction(req: Request, res: Response) {
    try {
      const commentId = req.params.id;
      let foundReaction: null | any = null;
      foundReaction = await reactionModel.findById(commentId);

      if (!foundReaction) {
        return res.status(404).json({
          message: "Reaction not found",
          data: foundReaction,
        });
      }

      res.status(200).json({
        message: "Comment found",
        data: databaseResponseParser(deepCopyParser(foundReaction)),
      });
    } catch (e) {
      return res
        .status(500)
        .json({ message: "Server Error", data: (e as ErrorType).message });
    }
  }

  async updateReaction(req: Request, res: Response) {
    try {
      const commentId = req.params.id;
      const { content } = req.body;

      const { error, value } = reactionSchemaValidator.validate(req.body);
      if (error) {
        console.log("Error message:", error.details[0].message);
        throw Error(error.details[0].message);
      }

      const reaction = await reactionModel.findByIdAndUpdate(
        commentId,
        { content },
        { new: true, runValidators: true }
      );

      if (!reaction) {
        return res
          .status(404)
          .json({ message: "Reaction not found", data: reaction });
      }

      res.status(200).json({
        message: "Reaction updated successfully",
        data: databaseResponseParser(deepCopyParser(reaction)),
      });
    } catch (e) {
      return res
        .status(500)
        .json({ message: "Server Error", data: (e as ErrorType).message });
    }
  }

  async deleteReaction(req: Request, res: Response) {
    try {
      const commentId = req.params.id;
      const reaction = await reactionModel.findByIdAndDelete(commentId);

      if (!reaction) {
        return res
          .status(404)
          .json({ message: "Reaction not found", data: reaction });
      }

      return res.status(200).json({
        message: "Comment deleted successfully",
        data: databaseResponseParser(deepCopyParser(reaction)),
      });
    } catch (e) {
      console.log((e as any).message);
      return res
        .status(500)
        .json({ message: "Server Error", data: (e as ErrorType).message });
    }
  }
}

export default new ReactionController();
