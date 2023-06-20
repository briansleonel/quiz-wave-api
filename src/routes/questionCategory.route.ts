import { Router } from "express";
import questionCategoryController from "../controllers/questionCategory.controller";

const questionCategoryRouter = Router();

questionCategoryRouter.get("/category", questionCategoryController.getAll);

questionCategoryRouter.get(
    "/category/:id",
    questionCategoryController.getCategory
);

questionCategoryRouter.post(
    "/category",
    questionCategoryController.addCategory
);

questionCategoryRouter.put(
    "/category/:id",
    questionCategoryController.updateCategory
);

questionCategoryRouter.delete(
    "/category/:id",
    questionCategoryController.deleteCategory
);

export default questionCategoryRouter;
