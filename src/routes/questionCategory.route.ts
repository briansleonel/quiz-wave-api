import { Router } from "express";
import questionCategoryController from "../controllers/questionCategory.controller";
import { authRequired } from "../middlewares/validateToken.middleware";
import { validateSchema } from "../middlewares/validateSchema.middleware";
import { categorySchema } from "../schemas/category.schema";
import { validateRoleAdmin } from "../middlewares/validateRole.middleware";

const questionCategoryRouter = Router();

questionCategoryRouter.get(
    "/category",
    authRequired,
    questionCategoryController.getAllQuery
);

questionCategoryRouter.get(
    "/all/category",
    authRequired,
    questionCategoryController.getAllQuery
);

questionCategoryRouter.get(
    "/category/:id",
    authRequired,
    questionCategoryController.getCategory
);

questionCategoryRouter.post(
    "/category",
    authRequired,
    validateRoleAdmin,
    validateSchema(categorySchema),
    questionCategoryController.addCategory
);

questionCategoryRouter.put(
    "/category/:id",
    authRequired,
    validateRoleAdmin,
    validateSchema(categorySchema),
    questionCategoryController.updateCategory
);

questionCategoryRouter.delete(
    "/category/:id",
    authRequired,
    validateRoleAdmin,
    questionCategoryController.deleteCategory
);

export default questionCategoryRouter;
