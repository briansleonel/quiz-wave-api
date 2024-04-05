import { Router } from "express";
import questionCategoryController from "../controllers/questionCategory.controller";
import { authRequired } from "../middlewares/validateToken.middleware";
import { validateSchema } from "../middlewares/validateSchema.middleware";
import { categorySchema } from "../schemas/category.schema";
import { verifyRoleAdmin } from "../middlewares/validate-role/verifyRoleAdmin.middleware";

const questionCategoryRouter = Router();

/**
 *  @swagger
 *  /api/categories:
 *      get:
 *          summary: Get lis of question categories.
 *          tags:
 *              - Categories
 *          responses:
 *              200:
 *                  description: Success!
 *              400:
 *                  description: Bad request
 *              401 :
 *                  description: Unauthorized
 *              403:
 *                  description: Forbidden
 *              404:
 *                  description: Not found
 *              500:
 *                  description: Internal server error
 */
questionCategoryRouter.get("/", questionCategoryController.getAllQuery);

/**
 *  @swagger
 *  /api/categories/{id}:
 *      get:
 *          summary: Get a question category by ID
 *          tags:
 *              - Categories
 *          parameters:
 *              - in: path
 *                name: id
 *                required: true
 *                description: Id of the category you want to get
 *          responses:
 *              200:
 *                  description: Success!
 *              400:
 *                  description: Bad request
 *              401 :
 *                  description: Unauthorized
 *              403:
 *                  description: Forbidden
 *              404:
 *                  description: Not found
 *              500:
 *                  description: Internal server error
 */
questionCategoryRouter.get("/:id", questionCategoryController.getCategory);

/**
 *  @swagger
 *  /api/categories:
 *      post:
 *          summary: Add a question categories.
 *          security:
 *              - bearerAuth: []
 *          tags:
 *              - Categories
 *          requestBody:
 *              requerid: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/CategorySchema'
 *          responses:
 *              200:
 *                  description: Success!
 *              400:
 *                  description: Bad request
 *              401 :
 *                  description: Unauthorized
 *              403:
 *                  description: Forbidden
 *              404:
 *                  description: Not found
 *              500:
 *                  description: Internal server error
 */
questionCategoryRouter.post(
    "/",
    authRequired,
    verifyRoleAdmin,
    validateSchema(categorySchema),
    questionCategoryController.addCategory
);

/**
 *  @swagger
 *  /api/categories/{id}:
 *      put:
 *          summary: Update a question categories.
 *          security:
 *              - bearerAuth: []
 *          tags:
 *              - Categories
 *          requestBody:
 *              requerid: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/CategorySchema'
 *          parameters:
 *              - in: path
 *                name: id
 *                required: true
 *                description: Id of the category you want to update
 *          responses:
 *              200:
 *                  description: Success!
 *              400:
 *                  description: Bad request
 *              401 :
 *                  description: Unauthorized
 *              403:
 *                  description: Forbidden
 *              404:
 *                  description: Not found
 *              500:
 *                  description: Internal server error
 */
questionCategoryRouter.put(
    "/:id",
    authRequired,
    verifyRoleAdmin,
    validateSchema(categorySchema),
    questionCategoryController.updateCategory
);

/**
 *  @swagger
 *  /api/categories/{id}:
 *      delete:
 *          summary: Delete a question categories.
 *          security:
 *              - bearerAuth: []
 *          tags:
 *              - Categories
 *          parameters:
 *              - in: path
 *                name: id
 *                required: true
 *                description: Id of the category you want to delete
 *          responses:
 *              200:
 *                  description: Success!
 *              400:
 *                  description: Bad request
 *              401 :
 *                  description: Unauthorized
 *              403:
 *                  description: Forbidden
 *              404:
 *                  description: Not found
 *              500:
 *                  description: Internal server error
 */
questionCategoryRouter.delete(
    "/:id",
    authRequired,
    verifyRoleAdmin,
    questionCategoryController.deleteCategory
);

export default questionCategoryRouter;
