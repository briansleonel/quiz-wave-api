import { Router } from "express";
import questionCategoryController from "../controllers/questionCategory.controller";
import { authRequired } from "../middlewares/validateToken.middleware";
import { validateSchema } from "../middlewares/validateSchema.middleware";
import { categorySchema } from "../schemas/category.schema";
import { verifyRoleAdmin } from "../middlewares/validate-role/verifyRoleAdmin.middleware";

const questionCategoryRouter = Router();

questionCategoryRouter.get(
    "/categories",
    authRequired,
    questionCategoryController.getAllQuery
);

questionCategoryRouter.get(
    "/categories/:id",
    authRequired,
    questionCategoryController.getCategory
);

questionCategoryRouter.post(
    "/categories",
    authRequired,
    verifyRoleAdmin,
    validateSchema(categorySchema),
    questionCategoryController.addCategory
);

questionCategoryRouter.put(
    "/categories/:id",
    authRequired,
    verifyRoleAdmin,
    validateSchema(categorySchema),
    questionCategoryController.updateCategory
);

questionCategoryRouter.delete(
    "/categories/:id",
    authRequired,
    verifyRoleAdmin,
    questionCategoryController.deleteCategory
);

export default questionCategoryRouter;
