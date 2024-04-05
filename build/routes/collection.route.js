"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const collection_controller_1 = __importDefault(require("../controllers/collection.controller"));
const validateToken_middleware_1 = require("../middlewares/validateToken.middleware");
const validateSchema_middleware_1 = require("../middlewares/validateSchema.middleware");
const collection_schema_1 = require("../schemas/collection.schema");
const verifyRoleUserCollection_middleware_1 = require("../middlewares/validate-role/verifyRoleUserCollection.middleware");
const verifyIdParam_middleware_1 = require("../middlewares/verifyIdParam.middleware");
const collectionRouter = (0, express_1.Router)();
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
collectionRouter.get("/", validateToken_middleware_1.authRequired, collection_controller_1.default.getCollectionsQuery);
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
collectionRouter.get("/:id", validateToken_middleware_1.authRequired, collection_controller_1.default.getCollection);
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
collectionRouter.post("/", validateToken_middleware_1.authRequired, (0, validateSchema_middleware_1.validateSchema)(collection_schema_1.collectionSchema), collection_controller_1.default.addCollection);
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
collectionRouter.put("/:id", validateToken_middleware_1.authRequired, verifyIdParam_middleware_1.verifyIdParam, verifyRoleUserCollection_middleware_1.verifyRoleUserCollection, (0, validateSchema_middleware_1.validateSchema)(collection_schema_1.collectionSchema), collection_controller_1.default.updateCollection);
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
collectionRouter.delete("/:id", validateToken_middleware_1.authRequired, verifyIdParam_middleware_1.verifyIdParam, verifyRoleUserCollection_middleware_1.verifyRoleUserCollection, collection_controller_1.default.deleteCollection);
exports.default = collectionRouter;
