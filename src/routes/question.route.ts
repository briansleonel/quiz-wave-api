import { Router } from "express";
import questionController from "../controllers/question.controller";
import { authRequired } from "../middlewares/validateToken.middleware";
import { validateSchema } from "../middlewares/validateSchema.middleware";
import { questionSchema } from "../schemas/question.schema";

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
    validateSchema(questionSchema),
    questionController.updateQuestion
);
questionRouter.delete(
    "/question/:id",
    authRequired,
    questionController.deleteQuestion
);

export default questionRouter;
