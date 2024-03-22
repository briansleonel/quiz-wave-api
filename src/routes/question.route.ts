import { Router } from "express";
import questionController from "../controllers/question.controller";
import { authRequired } from "../middlewares/validateToken.middleware";
import { validateSchema } from "../middlewares/validateSchema.middleware";
import { questionSchema } from "../schemas/question.schema";
import {
    valiateRoleUserQuestion,
    validateRoleAdmin,
} from "../middlewares/validateRole.middleware";

const questionRouter = Router();

questionRouter.get("/questions", authRequired, questionController.getAll);

questionRouter.get(
    "/questions/:id",
    authRequired,
    questionController.getQuestion
);

questionRouter.post(
    "/questions",
    authRequired,
    validateSchema(questionSchema),
    questionController.addQuestion
);

questionRouter.put(
    "/questions/:id",
    authRequired,
    valiateRoleUserQuestion,
    validateSchema(questionSchema),
    questionController.updateQuestion
);

questionRouter.delete(
    "/questions/:id",
    valiateRoleUserQuestion,
    authRequired,
    questionController.deleteQuestion
);

questionRouter.put(
    "/questions/verified/:id",
    authRequired,
    validateRoleAdmin,
    questionController.changeVerified
);

export default questionRouter;
