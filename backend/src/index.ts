import express, { Express } from "express";
import cors from "cors";
import { router as userRouter } from "./routes/user";
import { router as postRouter } from "./routes/post";
import { router as commentRouter } from "./routes/comment";
import mongoose from "mongoose";

import validatorConttroller from "./controllers/user/index";

const DB_URL = `mongodb+srv://dima:8326@cluster0.m6o8v9k.mongodb.net/?retryWrites=true&w=majority`;

const app: Express = express();
app.use(cors());
app.use(express.json());
//app.use(validateData)
// app.use((req: Request, res: Response, next: NextFunction) => {
//   const error = new Error("Endpoint Not Found") as any;
//   error.status = 404;
//   next(error);
// });

const port = 4000;
const router = express.Router();

app.use("/", userRouter);
app.use("/", postRouter);
app.use("/", commentRouter);

app.use(router.all("*", validatorConttroller.getEnpointNotFound));
run().catch((err) => console.log(err));

async function run() {
  try {
    await mongoose.connect(DB_URL, {
      //useNewUrlParser: true,
      //useUnifiedTopology: true,
    });
    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  } catch (error) {
    console.log(error);
  }
}
