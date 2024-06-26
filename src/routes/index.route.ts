import { Router } from "express";
import questionRouter from "./question.route";
import questionCategoryRouter from "./questionCategory.route";
import userRouter from "./user.route";
import collectionRouter from "./collection.route";
import authRouter from "./authentication.route";
import gameRouter from "./game.route";

const router = Router();

router.use("/questions", questionRouter);
router.use("/categories", questionCategoryRouter);
router.use("/users", userRouter);
router.use("/collections", collectionRouter);
router.use("/game", gameRouter);
router.use("/", authRouter);

export default router;

/**
 *  @swagger
 *  components:
 *      securitySchemes:
 *          bearerAuth:
 *              type: http
 *              in: header
 *              name: authorization
 *              bearerFormat: JWT
 *              scheme: bearer
 */

/**
 *  @swagger
 *  components:
 *      schemas:
 *          LoginSchema:
 *              type: object
 *              properties:
 *                  username:
 *                      type: string
 *                      description: Username
 *                  password:
 *                      type: string
 *                      description: User password
 *                      format: password
 *              required:
 *                  - username
 *                  - password
 *          RegisterSchema:
 *              type: object
 *              properties:
 *                  username:
 *                      type: string
 *                      description: Username
 *                  password:
 *                      type: string
 *                      description: User password
 *                  email:
 *                      type: string
 *                      description: Email
 *                      format: email
 *                  firstName:
 *                      type: string
 *                      description: First name
 *                  lastName:
 *                      type: string
 *                      description: Last name
 *              required:
 *                  - username
 *                  - password
 *                  - email
 *                  - firstName
 *                  - lastName
 *          CollectionSchema:
 *              type: object
 *              properties:
 *                  name:
 *                      type: string
 *                      description: Collection name
 *                  description:
 *                      type: string
 *                      description: Collection description
 *                  questions:
 *                      type: array
 *                      description: Collection questions
 *                      items:
 *                          type: object
 *                          properties:
 *                              question:
 *                                  type: string
 *                                  description: Question
 *                              options:
 *                                  type: array
 *                                  description: Question options
 *                                  items:
 *                                      type: string
 *                              correct:
 *                                  type: number
 *                                  description: Correct option
 *                              duration:
 *                                  type: number
 *                                  description: Question duration
 *                              description:
 *                                  type: string
 *                                  description: Question description
 *                          required:
 *                              - question
 *                              - options
 *                              - correct
 *              required:
 *                  - name
 *                  - questions
 *          CategorySchema:
 *              type: object
 *              properties:
 *                  name:
 *                      type: string
 *                      description: Category name
 *              required:
 *                  - name
 *          QuestionSchema:
 *              type: object
 *              properties:
 *                  question:
 *                      type: string
 *                      description: Question
 *                  options:
 *                      type: array
 *                      description: Question options
 *                      items:
 *                          type: string
 *                  correct:
 *                      type: number
 *                      description: Correct option
 *                  description:
 *                      type: string
 *                      description: Question description
 *                  category:
 *                      type: string
 *                      description: Question category ID
 *              required:
 *                  - question
 *                  - options
 *                  - correct
 *                  - category
 */
