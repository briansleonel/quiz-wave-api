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

questionRouter.get("/question", authRequired, questionController.getAll);

questionRouter.get(
    "/question/:id",
    authRequired,
    questionController.getQuestion
);

questionRouter.post(
    "/question",
    authRequired,
    validateSchema(questionSchema),
    questionController.addQuestion
);

questionRouter.put(
    "/question/:id",
    authRequired,
    valiateRoleUserQuestion,
    validateSchema(questionSchema),
    questionController.updateQuestion
);

questionRouter.delete(
    "/question/:id",
    valiateRoleUserQuestion,
    authRequired,
    questionController.deleteQuestion
);

questionRouter.put(
    "/question/verified/:id",
    authRequired,
    validateRoleAdmin,
    questionController.changeVerified
);

export default questionRouter;
