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
questionRouter.get("/", publicRoute, questionController.getAll);

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
questionRouter.get("/:id", publicRoute, questionController.getQuestion);

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
questionRouter.post(
    "/",
    authRequired,
    validateSchema(questionSchema),
    questionController.addQuestion
);

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
questionRouter.put(
    "/:id",
    authRequired,
    verifyIdParam,
    verifyRoleUserQuestion,
    validateSchema(questionSchema),
    questionController.updateQuestion
);

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
questionRouter.delete(
    "/:id",
    authRequired,
    verifyIdParam,
    verifyRoleUserQuestion,
    questionController.deleteQuestion
);

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
questionRouter.put(
    "/:id/verified",
    authRequired,
    verifyIdParam,
    verifyRoleAdmin,
    questionController.changeVerified
);

export default questionRouter;
