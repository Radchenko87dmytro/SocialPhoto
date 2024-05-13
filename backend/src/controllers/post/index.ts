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
        data: databaseResponseParser(deepCopyParser(newPost)),
      });
    } catch (e) {
      return res
        .status(500)
        .json({ message: "Server ErrorR", data: (e as ErrorType).message });
    }
  }

  async getAllPosts(req: Request, res: Response) {
    try {
      let posts = await postModel.find();
      return res.status(200).json({
        message: "Posts gets succsessfully",
        data: databaseResponseParser(deepCopyParser(posts)),
      });
    } catch (e) {
      return res
        .status(500)
        .json({ message: "Server Error", data: (e as ErrorType).message });
    }
  }

  async getPost(req: Request, res: Response) {
    try {
      const postId = req.params.id;
      let foundPost: null | any = null;
      foundPost = await postModel.findById(postId);

      if (!foundPost) {
        return res.status(404).json({
          message: "Post not found",
          data: foundPost,
        });
      }

      res.status(200).json({
        message: "Post found",
        data: databaseResponseParser(deepCopyParser(foundPost)),
      });
    } catch (e) {
      return res
        .status(500)
        .json({ message: "Server Error", data: (e as ErrorType).message });
    }
  }

  async updatePost(req: Request, res: Response) {
    try {
      const postId = req.params.id;
      const { linkUrl, content } = req.body;

      const { error, value } = postSchemaValidator.validate(req.body);
      if (error) {
        console.log("Error message:", error.details[0].message);
        throw Error(error.details[0].message);
      }

      const post = await postModel.findByIdAndUpdate(
        postId,
        { linkUrl, content },
        { new: true, runValidators: true }
      );

      if (!post) {
        return res.status(404).json({ message: "Post not found", data: post });
      }

      res.status(200).json({
        message: "Post updated successfully",
        data: databaseResponseParser(deepCopyParser(post)),
      });
    } catch (e) {
      return res
        .status(500)
        .json({ message: "Server Error", data: (e as ErrorType).message });
    }
  }

  async deletePost(req: Request, res: Response) {
    try {
      const postId = req.params.id;
      const post = await postModel.findByIdAndDelete(postId);

      if (!post) {
        return res.status(404).json({ message: "Post not found", data: post });
      }

      return res.status(200).json({
        message: "Post deleted successfully",
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
