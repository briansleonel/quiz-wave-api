import { Router } from "express";
import userController from "../controllers/user.controller";
import { authRequired } from "../middlewares/validateToken.middleware";
import { verifyRoleAdmin } from "../middlewares/validate-role/verifyRoleAdmin.middleware";

const userRouter = Router();

userRouter.get("/users", authRequired, verifyRoleAdmin, userController.getAll);

userRouter.get(
    "/users/:id",
    authRequired,
    verifyRoleAdmin,
    userController.getUser
);

userRouter.get(
    "/users/:id/questions",
    authRequired,
    userController.getQuestionsFromUser
);

userRouter.get(
    "/users/:id/collections",
    authRequired,
    userController.getCollectionsFromUser
);

userRouter.post(
    "/users",
    authRequired,
    verifyRoleAdmin,
    userController.addUser
);

userRouter.put("/users/:id", authRequired, userController.updateUser);

userRouter.delete(
    "/users/:id",
    authRequired,
    verifyRoleAdmin,
    userController.deleteUser
);

userRouter.put(
    "/users/verified/:id",
    authRequired,
    verifyRoleAdmin,
    userController.changeVerifiedUser
);

export default userRouter;
