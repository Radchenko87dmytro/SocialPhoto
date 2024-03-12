import { validateData } from "./validators/index";
import express, { Express } from "express";
import cors from "cors";
import { userModel } from "./schema";
import { router } from "./routes";
import { userValidator } from "./validators/user";

const app: Express = express();
app.use(cors());
app.use(express.json());
//app.use(validateData);
app.use(userValidator);

const port = 4000;

app.use("/", router);

run().catch((err) => console.log(err));

async function run() {
  try {
    app.listen(port, () => {
      console.log(`Server is running at http://localhast:${port}`);
    });
  } catch (error) {
    console.log(error);
  }
}
