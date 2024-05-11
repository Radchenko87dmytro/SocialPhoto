import { v4 as uuidv4 } from "uuid";
import { Request, Response } from "express";
import { postModel } from "../../schema/post";
import { databaseResponseParser, deepCopyParser } from "../../common";
import { ErrorType } from "../../types";

class Post {
  async createPost(req: Request, res: Response) {
    try {
      const { id, linkUrl, content } = req.body;
      const newPost = await postModel.create({
        id: `${uuidv4()}`,

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
    } catch (e) {}
  }
}

export default new Post();
