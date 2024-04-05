import { Router } from "express";
import userController from "../controllers/user.controller";
import { authRequired } from "../middlewares/validateToken.middleware";
import { verifyRoleAdmin } from "../middlewares/validate-role/verifyRoleAdmin.middleware";
import { verifyUpdateUserData } from "../middlewares/validate-role/verifyUpdateUserData.middleware";

const userRouter = Router();

/**
 *  @swagger
 *  /api/users:
 *      get:
 *          summary: Get lis of users
 *          security:
 *              - bearerAuth: []
 *          tags:
 *              - Users
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
 *                name: verified
 *                schema:
 *                      type: boolean
 *                description: Show verified users
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
userRouter.get("/", authRequired, verifyRoleAdmin, userController.getAll);

/**
 *  @swagger
 *  /api/users/{id}:
 *      get:
 *          summary: Get a user by ID
 *          security:
 *              - bearerAuth: []
 *          tags:
 *              - Users
 *          parameters:
 *              - in: path
 *                name: id
 *                description: Id of the user you want to get
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
userRouter.get("/:id", authRequired, verifyRoleAdmin, userController.getUser);

/**
 *  @swagger
 *  /api/users/{id}/questions:
 *      get:
 *          summary: return the list of a user's questions
 *          tags:
 *              - Users
 *          security:
 *              - bearerAuth: []
 *          parameters:
 *              - in: path
 *                name: id
 *                description: Id of the user
 *                required: true
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
userRouter.get(
    "/:id/questions",
    authRequired,
    userController.getQuestionsFromUser
);

/**
 *  @swagger
 *  /api/users/{id}/collections:
 *      get:
 *          summary: return the list of a user's collections
 *          security:
 *              - bearerAuth: []
 *          tags:
 *              - Users
 *          parameters:
 *              - in: path
 *                name: id
 *                description: Id of the user
 *                required: true
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
 *                name: recents
 *                schema:
 *                      type: boolean
 *                description: Show recent collections
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
userRouter.get(
    "/:id/collections",
    authRequired,
    userController.getCollectionsFromUser
);

//userRouter.post("/", authRequired, verifyRoleAdmin, userController.addUser);

/**
 *  @swagger
 *  /api/users/{id}:
 *      put:
 *          summary: Update the user data
 *          tags:
 *              - Users
 *          security:
 *              - bearerAuth: []
 *          parameters:
 *              - in: path
 *                name: id
 *                required: true
 *                description: Id of the user you want to update
 *          requestBody:
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
userRouter.put("/:id", authRequired, verifyUpdateUserData, userController.updateUser);

/**
 *  @swagger
 *  /api/users/{id}:
 *      delete:
 *          summary: Delete a user
 *          tags:
 *              - Users
 *          security:
 *              - bearerAuth: []
 *          parameters:
 *              - in: path
 *                name: id
 *                required: true
 *                description: Id of the user you want to delete
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
userRouter.delete(
    "/:id",
    authRequired,
    verifyRoleAdmin,
    userController.deleteUser
);

/**
 *  @swagger
 *  /api/users/{id}/verified:
 *      put:
 *          summary: Change the verification of a user
 *          security:
 *              - bearerAuth: []
 *          tags:
 *              - Users
 *          parameters:
 *              - in: path
 *                name: id
 *                required: true
 *                description: Id of the user you want to change the verification
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
userRouter.put(
    "/:id/verified",
    authRequired,
    verifyRoleAdmin,
    userController.changeVerifiedUser
);

export default userRouter;
