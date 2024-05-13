import express from "express";
import PostController from "../../controllers/Post";

export const router = express.Router();

router.post("/post", PostController.createPost);
router.get("/posts", PostController.getAllPosts);
router.get("/post/:id", PostController.getPost);
router.put("/post/:id", PostController.updatePost);
router.delete("/post/:id", PostController.deletePost);
