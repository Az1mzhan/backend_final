import postController from "./PostController.js";
import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware.js";

const postRouter = new Router();

postRouter
  .route("/")
  .get(postController.getPosts)
  .post(postController.createPost);

postRouter
  .route("/:id")
  .get(postController.getPost)
  .put(authMiddleware, postController.updatePost)
  .delete(authMiddleware, postController.deletePost);

export default postRouter;
