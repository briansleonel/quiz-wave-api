import { Router } from "express";
import questionCategoryController from "../controllers/questionCategory.controller";
import { authRequired } from "../middlewares/validateToken.middleware";
import { validateSchema } from "../middlewares/validateSchema.middleware";
import { categorySchema } from "../schemas/category.schema";
import { verifyRoleAdmin } from "../middlewares/validate-role/verifyRoleAdmin.middleware";

const questionCategoryRouter = Router();

questionCategoryRouter.get("/", questionCategoryController.getAllQuery);

questionCategoryRouter.get("/:id", questionCategoryController.getCategory);

questionCategoryRouter.post(
    "/",
    authRequired,
    verifyRoleAdmin,
    validateSchema(categorySchema),
    questionCategoryController.addCategory
);

questionCategoryRouter.put(
    "/:id",
    authRequired,
    verifyRoleAdmin,
    validateSchema(categorySchema),
    questionCategoryController.updateCategory
);

questionCategoryRouter.delete(
    "/:id",
    authRequired,
    verifyRoleAdmin,
    questionCategoryController.deleteCategory
);

export default questionCategoryRouter;
