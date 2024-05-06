import express from "express";
import UserController from "../../controllers/index";
import validatorConttroller from "../../controllers/user";

export const router = express.Router();

router.post("/users", UserController.createUser);
router.get("/users", UserController.getAllUsers);
router.get("/users/:value", UserController.getUser);
router.put("/users/:_id", UserController.updateUser);
router.delete("/users/:_id", UserController.deleateUser);
router.all("*", validatorConttroller.getEnpointNotFound);
