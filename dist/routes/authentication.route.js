"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authentication_controller_1 = __importDefault(require("../controllers/authentication.controller"));
const validateSchema_middleware_1 = require("../middlewares/validateSchema.middleware");
const auth_schema_1 = require("../schemas/auth.schema");
const authRouter = (0, express_1.Router)();
/**
 *  @swagger
 *  /api/login:
 *      post:
 *          summary: Login of a user to get the token
 *          tags:
 *              - Authentication
 *          requestBody:
 *              description: Esquema de login
 *              requerid: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/LoginSchema'
 *          responses:
 *              200:
 *                  description: Logged in
 *              400:
 *                  description: Invalid username or password
 *              500 :
 *                  description: Internal server error
 */
authRouter.post("/login", (0, validateSchema_middleware_1.validateSchema)(auth_schema_1.loginSchema), authentication_controller_1.default.login);
/**
 *  @swagger
 *  /api/logout:
 *      post:
 *          summary: Logout of a user
 *          tags:
 *              - Authentication
 *          security:
 *              - bearerAuth: []
 *          responses:
 *              200:
 *                  description: Logged in
 *              500 :
 *                  description: Internal server error
 */
authRouter.post("/logout", authentication_controller_1.default.logout);
/**
 *  @swagger
 *  /api/register:
 *      post:
 *          summary: Register of a user and get the token
 *          tags:
 *              - Authentication
 *          requestBody:
 *              description: Esquema de login
 *              requerid: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/RegisterSchema'
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
authRouter.post("/register", (0, validateSchema_middleware_1.validateSchema)(auth_schema_1.registerSchema), authentication_controller_1.default.register);
exports.default = authRouter;
