import { NextFunction, Request, Response } from "express";
import { ErrorType } from "../../types";

class validatorConttroller {
  async getEnpointNotFound(req: Request, res: Response, next: NextFunction) {
    try {
      //if (req.params )

      const e = new Error("Endpoint Not Found") as any;
      if (e) {
        return res.status(400).json({
          message: "Endpoint Not Found",
          data: e,
        });
      }
      console.log("Endpoint Not Found");
      e.status = 404;
      next(e);
    } catch (e) {
      return res
        .status(500)
        .json({ message: "Server ErrorR", data: (e as ErrorType).message });
    }
  }
}

export default new validatorConttroller();
