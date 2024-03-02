import express from "express";
import UserController from "../controllers/index";

export const router = express.Router();

router.post("/users", UserController.createUser);
router.post("/users", UserController.getAllUsers);
router.post("/users/:id", UserController.getUser);
router.post("/users/:id", UserController.updateUser);
router.post("/users/:id", UserController.deleateUser);
