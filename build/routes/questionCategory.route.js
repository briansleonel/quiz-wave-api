"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const questionCategory_controller_1 = __importDefault(require("../controllers/questionCategory.controller"));
const validateToken_middleware_1 = require("../middlewares/validateToken.middleware");
const validateSchema_middleware_1 = require("../middlewares/validateSchema.middleware");
const category_schema_1 = require("../schemas/category.schema");
const verifyRoleAdmin_middleware_1 = require("../middlewares/validate-role/verifyRoleAdmin.middleware");
const questionCategoryRouter = (0, express_1.Router)();
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
questionCategoryRouter.get("/", questionCategory_controller_1.default.getAllQuery);
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
questionCategoryRouter.get("/:id", questionCategory_controller_1.default.getCategory);
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
questionCategoryRouter.post("/", validateToken_middleware_1.authRequired, verifyRoleAdmin_middleware_1.verifyRoleAdmin, (0, validateSchema_middleware_1.validateSchema)(category_schema_1.categorySchema), questionCategory_controller_1.default.addCategory);
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
questionCategoryRouter.put("/:id", validateToken_middleware_1.authRequired, verifyRoleAdmin_middleware_1.verifyRoleAdmin, (0, validateSchema_middleware_1.validateSchema)(category_schema_1.categorySchema), questionCategory_controller_1.default.updateCategory);
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
questionCategoryRouter.delete("/:id", validateToken_middleware_1.authRequired, verifyRoleAdmin_middleware_1.verifyRoleAdmin, questionCategory_controller_1.default.deleteCategory);
exports.default = questionCategoryRouter;
