import { Router } from "express";
import collectionController from "../controllers/collection.controller";
import { authRequired } from "../middlewares/validateToken.middleware";
import { validateSchema } from "../middlewares/validateSchema.middleware";
import { collectionSchema } from "../schemas/collection.schema";
import { verifyRoleUserCollection } from "../middlewares/validate-role/verifyRoleUserCollection.middleware";
import { verifyIdParam } from "../middlewares/verifyIdParam.middleware";

const collectionRouter = Router();

/**
 *  @swagger
 *  /api/collections:
 *      get:
 *          summary: Get lis of collections
 *          security:
 *              - bearerAuth: []
 *          tags:
 *              - Collections
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
 *                description: Collections of a user to return
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
collectionRouter.get(
    "/",
    authRequired,
    collectionController.getCollectionsQuery
);

/**
 *  @swagger
 *  /api/collections/{id}:
 *      get:
 *          summary: Get a collection by ID
 *          security:
 *              - bearerAuth: []
 *          tags:
 *              - Collections
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
collectionRouter.get("/:id", authRequired, collectionController.getCollection);

/**
 *  @swagger
 *  /api/collections:
 *      post:
 *          summary: Add a collection
 *          security:
 *              - bearerAuth: []
 *          tags:
 *              - Collections
 *          requestBody:
 *              requerid: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/CollectionSchema'
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
collectionRouter.post(
    "/",
    authRequired,
    validateSchema(collectionSchema),
    collectionController.addCollection
);

/**
 *  @swagger
 *  /api/collections/{id}:
 *      put:
 *          summary: Update a collection
 *          security:
 *              - bearerAuth: []
 *          tags:
 *              - Collections
 *          parameters:
 *              - in: path
 *                name: id
 *                required: true
 *                description: Id of the collection you want to update
 *          requestBody:
 *              requerid: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/CollectionSchema'
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
collectionRouter.put(
    "/:id",
    authRequired,
    verifyIdParam,
    verifyRoleUserCollection,
    validateSchema(collectionSchema),
    collectionController.updateCollection
);

/**
 *  @swagger
 *  /api/collections/{id}:
 *      delete:
 *          summary: Delete a collection
 *          security:
 *              - bearerAuth: []
 *          tags:
 *              - Collections
 *          parameters:
 *              - in: path
 *                name: id
 *                required: true
 *                description: Id of the collection you want to delete
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
collectionRouter.delete(
    "/:id",
    authRequired,
    verifyIdParam,
    verifyRoleUserCollection,
    collectionController.deleteCollection
);

export default collectionRouter;
