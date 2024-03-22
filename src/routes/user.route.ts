import { Router } from "express";
import userController from "../controllers/user.controller";
import { authRequired } from "../middlewares/validateToken.middleware";

const userRouter = Router();

userRouter.get("/users", authRequired, userController.getAll);
userRouter.get("/users/:id", authRequired, userController.getUser);
userRouter.post("/users", authRequired, userController.addUser);
userRouter.put("/users/:id", authRequired, userController.updateUser);
userRouter.delete("/users/:id", authRequired, userController.deleteUser);
userRouter.put(
    "/users/verified/:id",
    authRequired,
    userController.changeVerifiedUser
);

export default userRouter;

/*
userRouter.get("/user", (_req, res) => {res.send("All Users")})
userRouter.get("/user/:id", (_req, res) => {res.send("A user")})
userRouter.post("/user", (_req, res) => {res.send("Add user")})
userRouter.put("/user/:id", (_req, res) => {res.send("Update user")})
userRouter.delete("/user/:id", (_req, res) => {res.send("Delete user")})
*/
