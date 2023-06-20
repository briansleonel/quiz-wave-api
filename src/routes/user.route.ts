import { Router } from "express";
import userController from "../controllers/user.controller";

const userRouter = Router();

userRouter.get("/user", userController.getAll);
userRouter.get("/user/:id", userController.getUser);
userRouter.post("/user", userController.addUser);
userRouter.put("/user/:id", userController.updateUser);
userRouter.delete("/user/:id", userController.deleteUser);

export default userRouter;

/*
userRouter.get("/user", (_req, res) => {res.send("All Users")})
userRouter.get("/user/:id", (_req, res) => {res.send("A user")})
userRouter.post("/user", (_req, res) => {res.send("Add user")})
userRouter.put("/user/:id", (_req, res) => {res.send("Update user")})
userRouter.delete("/user/:id", (_req, res) => {res.send("Delete user")})
*/
