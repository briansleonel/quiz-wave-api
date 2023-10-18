import { Router } from "express";
import collectionController from "../controllers/collection.controller";
import { authRequired } from "../middlewares/validateToken.middleware";

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
    collectionController.addCollection
);
collectionRouter.put(
    "/collection/:id",
    authRequired,
    collectionController.updateCollection
);
collectionRouter.delete(
    "/collection/:id",
    authRequired,
    collectionController.deleteCollection
);

export default collectionRouter;
