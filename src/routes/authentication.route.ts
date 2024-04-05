import { Router } from "express";
import authController from "../controllers/authentication.controller";
import { validateSchema } from "../middlewares/validateSchema.middleware";
import { loginSchema, registerSchema } from "../schemas/auth.schema";

const authRouter = Router();

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
authRouter.post("/login", validateSchema(loginSchema), authController.login);

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
authRouter.post("/logout", authController.logout);

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
authRouter.post(
    "/register",
    validateSchema(registerSchema),
    authController.register
);

export default authRouter;
