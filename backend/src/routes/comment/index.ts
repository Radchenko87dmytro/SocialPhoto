import express from "express";
import CommentController from "../../controllers/comments";

export const router = express.Router();

router.post("/comment", CommentController.createComment);
router.get("/comments", CommentController.getAllComments);
router.get("/comment/:id", CommentController.getComment);
router.put("/comment/:id", CommentController.updateComment);
router.delete("/comment/:id", CommentController.deleteComment);
