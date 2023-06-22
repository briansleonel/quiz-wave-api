import { Router } from "express";
import questionController from "../controllers/question.controller";
import { authRequired } from "../middlewares/validateToken.middleware";

const questionRouter = Router();

questionRouter.get("/question", authRequired, questionController.getAll);
questionRouter.get(
    "/question/:id",
    authRequired,
    questionController.getQuestion
);
questionRouter.post("/question", authRequired, questionController.addQuestion);
questionRouter.put(
    "/question/:id",
    authRequired,
    questionController.updateQuestion
);
questionRouter.delete(
    "/question/:id",
    authRequired,
    questionController.deleteQuestion
);

export default questionRouter;
