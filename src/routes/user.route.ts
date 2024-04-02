import { Router } from "express";
import userController from "../controllers/user.controller";
import { authRequired } from "../middlewares/validateToken.middleware";
import { verifyRoleAdmin } from "../middlewares/validate-role/verifyRoleAdmin.middleware";

const userRouter = Router();

userRouter.get("/", authRequired, verifyRoleAdmin, userController.getAll);

userRouter.get("/:id", authRequired, verifyRoleAdmin, userController.getUser);

userRouter.get(
    "/:id/questions",
    authRequired,
    userController.getQuestionsFromUser
);

userRouter.get(
    "/:id/collections",
    authRequired,
    userController.getCollectionsFromUser
);

userRouter.post("/", authRequired, verifyRoleAdmin, userController.addUser);

userRouter.put("/users/:id", authRequired, userController.updateUser);

userRouter.delete(
    "/:id",
    authRequired,
    verifyRoleAdmin,
    userController.deleteUser
);

userRouter.put(
    "/verified/:id",
    authRequired,
    verifyRoleAdmin,
    userController.changeVerifiedUser
);

export default userRouter;
