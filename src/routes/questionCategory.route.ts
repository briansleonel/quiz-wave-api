import { Router } from "express";
import questionCategoryController from "../controllers/questionCategory.controller";
import { authRequired } from "../middlewares/validateToken.middleware";

const questionCategoryRouter = Router();

questionCategoryRouter.get(
    "/category",
    authRequired,
    questionCategoryController.getAll
);

questionCategoryRouter.get(
    "/category/:id",
    authRequired,
    questionCategoryController.getCategory
);

questionCategoryRouter.post(
    "/category",
    authRequired,
    questionCategoryController.addCategory
);

questionCategoryRouter.put(
    "/category/:id",
    authRequired,
    questionCategoryController.updateCategory
);

questionCategoryRouter.delete(
    "/category/:id",
    questionCategoryController.deleteCategory
);

export default questionCategoryRouter;
