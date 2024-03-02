import { userModel } from "../schema";
import { Request, Response } from "express";

export const validateData = (req: Request, res: Response) => {
  try {
    const { username, email, password, profileUrl, bio } = req.body;

    if (!username || typeof username !== "string" || username.trim() === "") {
      return res
        .status(400)
        .json({ mwssage: "Invalid username", data: username });
    }

    if (!email || typeof email !== "string" || !isValidEmail(email)) {
      return res.status(400).json({ mwssage: "Invalid email", data: email });
    }

    if (!password || typeof password !== "string" || password.length < 8) {
      return res
        .status(400)
        .json({ message: "Invalid password", data: password });
    }

    if (
      profileUrl &&
      typeof profileUrl !== "string" &&
      !isValidUrl(profileUrl)
    ) {
      return res
        .status(400)
        .json({ message: "Invalid profile URL", data: profileUrl });
    }

    if (bio && typeof bio !== "string" && bio.length > 100) {
      return res.status(400).json({ message: "Invalid bio", data: bio });
    }
  } catch (e) {
    return res.status(500).json({ message: "Server Error", data: e });
  }
};

const isValidEmail = (email: string): boolean => {
  return /\S+@\S+\.\S+/.test(email);
};

const isValidUrl = (url: string): boolean => {
  return /^https?:\/\/\S+/.test(url);
};
