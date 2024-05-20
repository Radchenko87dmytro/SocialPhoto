import express from "express";
import ReactionController from "../../controllers/reaction";

export const router = express.Router();

router.post("/reaction", ReactionController.createReaction);
router.get("/reactions", ReactionController.getAllReactions);
router.get("/reaction/:id", ReactionController.getReaction);
router.put("/reaction/:id", ReactionController.updateReaction);
router.delete("/reaction/:id", ReactionController.deleteReaction);
