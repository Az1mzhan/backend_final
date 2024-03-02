import "dotenv/config";
import mongoose from "mongoose";
import express from "express";
import path from "path";
import authRouter from "./auth/authRouter.js";
import postRouter from "./posts/postRouter.js";
import emailRouter from "./email/emailRouter.js";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.use("/", express.static(path.join(__dirname, "public")));
app.use("/posts", postRouter);
app.use("/", authRouter);
app.use("/email", emailRouter);

const start = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.emzkqhw.mongodb.net/?retryWrites=true&w=majority`,
      {
        dbName: process.env.DB_NAME,
      }
    );

    app.listen(port, () => {
      console.info(
        `The server has been successfully started on the port: ${port}`
      );
    });
  } catch (err) {
    console.error(err);
  }
};

await start();
