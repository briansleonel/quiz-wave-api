import { Router } from "express";
import questionController from "../controllers/question.controller";

const questionRouter = Router();

questionRouter.get("/question", questionController.getAll);
questionRouter.get("/question/:id", questionController.getQuestion);
questionRouter.post("/question", questionController.addQuestion);
questionRouter.put("/question/:id", questionController.updateQuestion);
questionRouter.delete("/question/:id", questionController.deleteQuestion);

export default questionRouter;
