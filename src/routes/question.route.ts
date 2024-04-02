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

questionRouter.get("/questions", publicRoute, questionController.getAll);

questionRouter.get(
    "/questions/:id",
    publicRoute,
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
    verifyIdParam,
    verifyRoleUserQuestion,
    validateSchema(questionSchema),
    questionController.updateQuestion
);

questionRouter.delete(
    "/questions/:id",
    authRequired,
    verifyIdParam,
    verifyRoleUserQuestion,
    questionController.deleteQuestion
);

questionRouter.put(
    "/questions/verified/:id",
    authRequired,
    verifyRoleAdmin,
    questionController.changeVerified
);

export default questionRouter;
