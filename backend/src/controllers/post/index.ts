import { v4 as uuidv4 } from "uuid";
import { Request, Response } from "express";
import { postModel } from "../../schema/post";
import { databaseResponseParser, deepCopyParser } from "../../common";
import { ErrorType } from "../../types";
import { postSchemaValidator } from "../../validators/post";

class PostController {
  async createPost(req: Request, res: Response) {
    try {
      const { linkUrl, content } = req.body;

      const { error, value } = postSchemaValidator.validate(req.body);
      if (error) {
        console.log("Error message:", error.details[0].message);
        throw Error(error.details[0].message);
      }

      const newPost = await postModel.create({
        linkUrl,
        content,
      });
      console.log(newPost);
      return res.status(200).json({
        message: "Post created succsessfully",
        data: databaseResponseParser(deepCopyParser(newPost)), //databaseResponseParser(deepCopyParser
      });
    } catch (e) {
      return res
        .status(500)
        .json({ message: "Server ErrorR", data: (e as ErrorType).message });
    }
  }

  async getAllPosts(req: Request, res: Response) {
    try {
    } catch (e) {}
  }

  async getPost(req: Request, res: Response) {
    try {
    } catch (e) {}
  }

  async updatePost(req: Request, res: Response) {
    try {
    } catch (e) {}
  }

  async deletePost(req: Request, res: Response) {
    try {
      const userId = req.params.id;
      const post = await postModel.findByIdAndDelete(userId);

      if (!post) {
        return res.status(404).json({ message: "Post not found", data: post });
      }

      return res.status(200).json({
        message: "User deleted successfully",
        data: databaseResponseParser(deepCopyParser(post)),
      });
    } catch (e) {
      console.log((e as any).message);
      return res
        .status(500)
        .json({ message: "Server Error", data: (e as ErrorType).message });
    }
  }
}

export default new PostController();
