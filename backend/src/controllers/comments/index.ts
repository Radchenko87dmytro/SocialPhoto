import { Request, Response } from "express";
import { postModel } from "../../schema/post";
import { databaseResponseParser, deepCopyParser } from "../../common";
import { ErrorType } from "../../types";
import { commentModel } from "../../schema/comment";
import { commentSchemaValidator } from "../../validators/comment";

class CommentsController {
  async createComment(req: Request, res: Response) {
    try {
      const { content, commentId } = req.body;

      const { error, value } = commentSchemaValidator.validate(req.body);
      if (error) {
        console.log("Error message:", error.details[0].message);
        throw Error(error.details[0].message);
      }

      const newComment = await commentModel.create({
        content,
        commentId,
      });
      console.log(newComment);
      return res.status(200).json({
        message: "Comment created succsessfully",
        data: databaseResponseParser(deepCopyParser(newComment)),
      });
    } catch (e) {
      return res
        .status(500)
        .json({ message: "Server Error", data: (e as ErrorType).message });
    }
  }

  async getAllComments(req: Request, res: Response) {
    try {
      let comments = await commentModel.find();
      return res.status(200).json({
        message: "Comments gets succsessfully",
        data: databaseResponseParser(deepCopyParser(comments)),
      });
    } catch (e) {
      return res
        .status(500)
        .json({ message: "Server Error", data: (e as ErrorType).message });
    }
  }

  async getComment(req: Request, res: Response) {
    try {
      const commentId = req.params.id;
      let foundComment: null | any = null;
      foundComment = await commentModel.findById(commentId);

      if (!foundComment) {
        return res.status(404).json({
          message: "Comment not found",
          data: foundComment,
        });
      }

      res.status(200).json({
        message: "Comment found",
        data: databaseResponseParser(deepCopyParser(foundComment)),
      });
    } catch (e) {
      return res
        .status(500)
        .json({ message: "Server Error", data: (e as ErrorType).message });
    }
  }

  async updateComment(req: Request, res: Response) {
    try {
      const commentId = req.params.id;
      const { content } = req.body;

      const { error, value } = commentSchemaValidator.validate(req.body);
      if (error) {
        console.log("Error message:", error.details[0].message);
        throw Error(error.details[0].message);
      }

      const comment = await postModel.findByIdAndUpdate(
        commentId,
        { content },
        { new: true, runValidators: true }
      );

      if (!comment) {
        return res
          .status(404)
          .json({ message: "Comment not found", data: comment });
      }

      res.status(200).json({
        message: "Comment updated successfully",
        data: databaseResponseParser(deepCopyParser(comment)),
      });
    } catch (e) {
      return res
        .status(500)
        .json({ message: "Server Error", data: (e as ErrorType).message });
    }
  }

  async deleteComment(req: Request, res: Response) {
    try {
      const commentId = req.params.id;
      const comment = await commentModel.findByIdAndDelete(commentId);

      if (!comment) {
        return res
          .status(404)
          .json({ message: "Comment not found", data: comment });
      }

      return res.status(200).json({
        message: "Comment deleted successfully",
        data: databaseResponseParser(deepCopyParser(comment)),
      });
    } catch (e) {
      console.log((e as any).message);
      return res
        .status(500)
        .json({ message: "Server Error", data: (e as ErrorType).message });
    }
  }
}

export default new CommentsController();
