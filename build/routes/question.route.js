"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const question_controller_1 = __importDefault(require("../controllers/question.controller"));
const validateToken_middleware_1 = require("../middlewares/validateToken.middleware");
const validateSchema_middleware_1 = require("../middlewares/validateSchema.middleware");
const question_schema_1 = require("../schemas/question.schema");
const verifyRoleUserQuestion_middleware_1 = require("../middlewares/validate-role/verifyRoleUserQuestion.middleware");
const verifyRoleAdmin_middleware_1 = require("../middlewares/validate-role/verifyRoleAdmin.middleware");
const verifyIdParam_middleware_1 = require("../middlewares/verifyIdParam.middleware");
const publicRoute_middleware_1 = require("../middlewares/publicRoute.middleware");
const questionRouter = (0, express_1.Router)();
/**
 *  @swagger
 *  /api/questions:
 *      get:
 *          summary: Get lis of questions
 *          tags:
 *              - Questions
 *          security:
 *              - {}
 *              - bearerAuth: []
 *          parameters:
 *              - in: query
 *                name: page
 *                schema:
 *                      type: integer
 *                description: The number page of items to return
 *              - in: query
 *                name: limit
 *                schema:
 *                      type: integer
 *                description: The numbers of items to return
 *              - in: query
 *                name: text
 *                schema:
 *                      type: string
 *                description: Text match to search
 *              - in: query
 *                name: user
 *                schema:
 *                      type: string
 *                description: Questions of a user to return
 *              - in: query
 *                name: category
 *                schema:
 *                      type: string
 *                description: Search by category ID
 *              - in: query
 *                name: verified
 *                schema:
 *                      type: boolean
 *                description: Verified questions to return
 *              - in: query
 *                name: recents
 *                schema:
 *                      type: boolean
 *                description: Show recent questions
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
questionRouter.get("/", publicRoute_middleware_1.publicRoute, question_controller_1.default.getAll);
/**
 *  @swagger
 *  /api/questions/{id}:
 *      get:
 *          summary: Get a question by ID
 *          tags:
 *              - Questions
 *          parameters:
 *              - in: path
 *                name: id
 *                description: Id of the collection you want to get
 *                required: true
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
questionRouter.get("/:id", publicRoute_middleware_1.publicRoute, question_controller_1.default.getQuestion);
/**
 *  @swagger
 *  /api/questions:
 *      post:
 *          summary: Add a question
 *          security:
 *              - bearerAuth: []
 *          tags:
 *              - Questions
 *          requestBody:
 *              requerid: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/QuestionSchema'
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
questionRouter.post("/", validateToken_middleware_1.authRequired, (0, validateSchema_middleware_1.validateSchema)(question_schema_1.questionSchema), question_controller_1.default.addQuestion);
/**
 *  @swagger
 *  /api/questions/{id}:
 *      put:
 *          summary: Update a question
 *          security:
 *              - bearerAuth: []
 *          tags:
 *              - Questions
 *          parameters:
 *              - in: path
 *                name: id
 *                required: true
 *                description: Id of the question you want to update
 *          requestBody:
 *              requerid: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/QuestionSchema'
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
questionRouter.put("/:id", validateToken_middleware_1.authRequired, verifyIdParam_middleware_1.verifyIdParam, verifyRoleUserQuestion_middleware_1.verifyRoleUserQuestion, (0, validateSchema_middleware_1.validateSchema)(question_schema_1.questionSchema), question_controller_1.default.updateQuestion);
/**
 *  @swagger
 *  /api/questions/{id}:
 *      delete:
 *          summary: Delete a question
 *          security:
 *              - bearerAuth: []
 *          tags:
 *              - Questions
 *          parameters:
 *              - in: path
 *                name: id
 *                required: true
 *                description: Id of the question you want to delete
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
questionRouter.delete("/:id", validateToken_middleware_1.authRequired, verifyIdParam_middleware_1.verifyIdParam, verifyRoleUserQuestion_middleware_1.verifyRoleUserQuestion, question_controller_1.default.deleteQuestion);
/**
 *  @swagger
 *  /api/questions/{id}/verified:
 *      put:
 *          summary: Change the verification of a question
 *          security:
 *              - bearerAuth: []
 *          tags:
 *              - Questions
 *          parameters:
 *              - in: path
 *                name: id
 *                required: true
 *                description: Id of the question you want to change the verification
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
questionRouter.put("/:id/verified", validateToken_middleware_1.authRequired, verifyIdParam_middleware_1.verifyIdParam, verifyRoleAdmin_middleware_1.verifyRoleAdmin, question_controller_1.default.changeVerified);
exports.default = questionRouter;
