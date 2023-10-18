import { Router } from "express";
import collectionController from "../controllers/collection.controller";
import { authRequired } from "../middlewares/validateToken.middleware";
import { validateSchema } from "../middlewares/validateSchema.middleware";
import { collectionSchema } from "../schemas/collection.schema";

const collectionRouter = Router();

collectionRouter.get(
    "/collection",
    authRequired,
    collectionController.getCollectionsQuery
);
collectionRouter.get(
    "/collection/:id",
    authRequired,
    collectionController.getCollection
);
collectionRouter.post(
    "/collection",
    authRequired,
    validateSchema(collectionSchema),
    collectionController.addCollection
);
collectionRouter.put(
    "/collection/:id",
    authRequired,
    validateSchema(collectionSchema),
    collectionController.updateCollection
);
collectionRouter.delete(
    "/collection/:id",
    authRequired,
    collectionController.deleteCollection
);

export default collectionRouter;
