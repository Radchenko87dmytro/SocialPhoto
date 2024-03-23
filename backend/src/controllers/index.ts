import { databaseResponseParser, deepCopyParser } from "./../common/index";
import { userSchemaValidator } from "../validators/user";
import { Request, Response } from "express";
import { userModel } from "../schema";

class UserController {
  async createUser(req: Request, res: Response) {
    try {
      const { _id, username, email, password, profileUrl, bio } = req.body;

      const { error, value } = userSchemaValidator.validate(req.body);
      if (error) throw Error(error.details[0].message);

      const newUser = await userModel.create({
        _id,
        username,
        email,
        password,
        profileUrl,
        bio,
      });

      return res.status(200).json({
        message: "User created succsessfully",
        data: databaseResponseParser(deepCopyParser(newUser)),
      });
    } catch (e) {
      console.error(e);
      return res.status(500).json({ message: "Server Error", data: e });
    }
  }

  async getAllUsers(req: Request, res: Response) {
    try {
      let users = await userModel.find();
      return res.status(200).json({
        message: "Users gets succsessfully",
        data: databaseResponseParser(deepCopyParser(users)),
      });
    } catch (e) {
      return res.status(500).json({ message: "Server Error", data: e });
    }
  }

  async getUser(req: Request, res: Response) {
    try {
      const { value } = req.params;

      let foundUser: null | any = null;
      // const regex = new RegExp(
      //   "/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i"
      // );

      // const regex =
      //   /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

      // if (regex.test(value)) {
      //   foundUser = await userModel.findById(value);
      //   console.log("value is valid");
      // } else {
      //   console.log("value errror");
      // }

      foundUser = await userModel.findById(value);

      if (!foundUser) {
        return res.status(404).json({
          message: "User not found",
          data: foundUser,
        });
      }

      res.status(200).json({
        message: "User found",
        data: databaseResponseParser(deepCopyParser(foundUser)),
      });
      console.log(databaseResponseParser(deepCopyParser(foundUser)));
    } catch (e) {
      return res.status(500).json({ message: "Server Error", data: e });
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      const userId = req.params._id;
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
        data: databaseResponseParser(deepCopyParser(user)),
      });
    } catch (e) {
      return res.status(500).json({ message: "Server Error", data: e });
    }
  }

  async deleateUser(req: Request, res: Response) {
    try {
      const userId = req.params._id;
      const user = await userModel.findByIdAndDelete(userId);

      if (!user) {
        return res.status(404).json({ message: "User not found", data: user });
      }

      return res.status(200).json({
        message: "User deleted successfully",
        data: databaseResponseParser(deepCopyParser(user)),
      });
    } catch (e) {
      return res.status(500).json({ message: "Server Error", data: e });
    }
  }
}

export default new UserController();
