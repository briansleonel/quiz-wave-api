import { Router } from "express";
import authController from "../controllers/authentication.controller";

const authRouter = Router();

authRouter.post("/login", authController.login);
authRouter.post("/logout", authController.logout);
authRouter.post("/register", authController.register);

export default authRouter;
