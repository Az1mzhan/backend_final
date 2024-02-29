import "dotenv/config";
import express from "express";
import path from "path";
import authRouter from "./auth/authRouter.js";
import emailRouter from "./email/emailRouter.js";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.use("/", express.static(path.join(__dirname, "public")));
app.use("/auth", authRouter);
app.use("/email", emailRouter);

const start = () => {
  try {
    app.listen(port, () => {
      console.info(
        `The server has been successfully started on the port: ${port}`
      );
    });
  } catch (err) {
    console.error(err);
  }
};

start();
