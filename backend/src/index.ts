import express, { Express } from "express";
import cors from "cors";
import { userModel } from "./schema";

const app: Express = express();
app.use(cors());
app.use(express.json());
const port = 4000;

app.use("/");

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
