import { Router } from "express";
import questionController from "../controllers/question.controller";
import { authRequired } from "../middlewares/validateToken.middleware";
import { validateSchema } from "../middlewares/validateSchema.middleware";
import { questionSchema } from "../schemas/question.schema";
import { verifyRoleUserQuestion } from "../middlewares/validate-role/verifyRoleUserQuestion.middleware";
import { verifyRoleAdmin } from "../middlewares/validate-role/verifyRoleAdmin.middleware";
import { verifyIdParam } from "../middlewares/verifyIdParam.middleware";
import { publicRoute } from "../middlewares/publicRoute.middleware";

const questionRouter = Router();

questionRouter.get("/", publicRoute, questionController.getAll);

questionRouter.get("/:id", publicRoute, questionController.getQuestion);

questionRouter.post(
    "/",
    authRequired,
    validateSchema(questionSchema),
    questionController.addQuestion
);

questionRouter.put(
    "/:id",
    authRequired,
    verifyIdParam,
    verifyRoleUserQuestion,
    validateSchema(questionSchema),
    questionController.updateQuestion
);

questionRouter.delete(
    "/:id",
    authRequired,
    verifyIdParam,
    verifyRoleUserQuestion,
    questionController.deleteQuestion
);

questionRouter.put(
    "/verified/:id",
    authRequired,
    verifyRoleAdmin,
    questionController.changeVerified
);

export default questionRouter;
