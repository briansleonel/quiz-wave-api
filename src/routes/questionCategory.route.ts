import { Router } from "express";
import questionCategoryController from "../controllers/questionCategory.controller";
import { authRequired } from "../middlewares/validateToken.middleware";
import { validateSchema } from "../middlewares/validateSchema.middleware";
import { categorySchema } from "../schemas/category.schema";

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
    validateSchema(categorySchema),
    questionCategoryController.addCategory
);

questionCategoryRouter.put(
    "/category/:id",
    authRequired,
    validateSchema(categorySchema),
    questionCategoryController.updateCategory
);

questionCategoryRouter.delete(
    "/category/:id",
    questionCategoryController.deleteCategory
);

export default questionCategoryRouter;
