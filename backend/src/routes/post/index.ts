import express from "express";
import newController from "../../controllers/Post";
import Post from "../../controllers/Post";

export const router = express.Router();

router.post("/post", Post.createPost);
router.get("/posts", Post.getAllPosts);
router.get("/post/:id", Post.getPost);
router.put("/post/:id", Post.updatePost);
router.delete("/post/:id", Post.deletePost);
router.all("*");
