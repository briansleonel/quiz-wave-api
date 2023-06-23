import { Router } from "express";
import authController from "../controllers/authentication.controller";
import { validateSchema } from "../middlewares/validateSchema.middleware";
import { loginSchema, registerSchema } from "../schemas/auth.schema";

const authRouter = Router();

authRouter.post("/login", validateSchema(loginSchema), authController.login);
authRouter.post("/logout", authController.logout);
authRouter.post(
    "/register",
    validateSchema(registerSchema),
    authController.register
);

export default authRouter;
