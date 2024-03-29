import { Router } from "express";
import collectionController from "../controllers/collection.controller";
import { authRequired } from "../middlewares/validateToken.middleware";
import { validateSchema } from "../middlewares/validateSchema.middleware";
import { collectionSchema } from "../schemas/collection.schema";
import { verifyRoleUserCollection } from "../middlewares/validate-role/verifyRoleUserCollection.middleware";

const collectionRouter = Router();

collectionRouter.get(
    "/collections",
    authRequired,
    collectionController.getCollectionsQuery
);
collectionRouter.get(
    "/collections/:id",
    authRequired,
    collectionController.getCollection
);
collectionRouter.post(
    "/collections",
    authRequired,
    validateSchema(collectionSchema),
    collectionController.addCollection
);
collectionRouter.put(
    "/collections/:id",
    authRequired,
    verifyRoleUserCollection,
    validateSchema(collectionSchema),
    collectionController.updateCollection
);
collectionRouter.delete(
    "/collections/:id",
    authRequired,
    verifyRoleUserCollection,
    collectionController.deleteCollection
);

export default collectionRouter;
