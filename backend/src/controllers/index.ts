import express, { Request, Response } from "express";
import mongoose from "mongoose";
import { userModel } from "../schema";

class UserController {
  async createUser(req: Request, res: Response) {
    try {
      const { username, email, password, profileUrl, bio } = req.body;
      const newUser = await userModel.create({
        username,
        email,
        password,
        profileUrl,
        bio,
      });

      return res.status(200).json({
        message: "User created succsessfully",
        data: newUser,
      });
    } catch (e) {
      return res.status(500).json({ message: "Server Error", data: e });
    }
  }

  async getAllUsers(req: Request, res: Response) {
    try {
      let users = await userModel.find();
      return res.status(200).json({
        message: "Users gets succsessfully",
        data: users,
      });
    } catch (e) {
      return res.status(500).json({ message: "Server Error", data: e });
    }
  }

  async getUser(req: Request, res: Response) {
    try {
      const userId = req.params.id;
      const user = await userModel.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found", data: user });
      }
      res.status(200).json({
        message: "User found",
        data: user,
      });
    } catch (e) {
      return res.status(500).json({ message: "Server Error", data: e });
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      const userId = req.params.id;
      const { username, email, password, profileUrl, bio } = req.body;

      const user = await userModel.findByIdAndUpdate(
        userId,
        { username, email, password, profileUrl, bio },
        { new: true, runValidators: true }
      );

      if (!user) {
        return res.status(404).json({ message: "User not found", data: user });
      }

      res.status(200).json({
        message: "User updated successfully",
        data: user,
      });
    } catch (e) {
      return res.status(500).json({ message: "Server Error", data: e });
    }
  }

  async deleateUser(req: Request, res: Response) {
    try {
      const userId = req.params.id;
      const user = await userModel.findByIdAndDelete(userId);

      if (!user) {
        return res.status(404).json({ message: "User not found", data: user });
      }

      return res.status(200).json({
        message: "User deleted successfully",
        data: user,
      });
    } catch (e) {
      return res.status(500).json({ message: "Server Error", data: e });
    }
  }
}

export default new UserController();
