"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const question_route_1 = __importDefault(require("./question.route"));
const questionCategory_route_1 = __importDefault(require("./questionCategory.route"));
const user_route_1 = __importDefault(require("./user.route"));
const collection_route_1 = __importDefault(require("./collection.route"));
const authentication_route_1 = __importDefault(require("./authentication.route"));
const game_route_1 = __importDefault(require("./game.route"));
const router = (0, express_1.Router)();
router.use("/questions", question_route_1.default);
router.use("/categories", questionCategory_route_1.default);
router.use("/users", user_route_1.default);
router.use("/collections", collection_route_1.default);
router.use("/game", game_route_1.default);
router.use("/", authentication_route_1.default);
exports.default = router;
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
