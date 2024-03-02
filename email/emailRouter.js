import { Router } from "express";
import emailController from "./EmailController.js";

const emailRouter = new Router();

emailRouter.route("/").post(emailController.sendEmail);

export default emailRouter;
