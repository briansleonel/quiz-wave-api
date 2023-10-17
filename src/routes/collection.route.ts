import { Router } from "express";
import collectionController from "../controllers/collection.controller";

const collectionRouter = Router();

collectionRouter.get("/collection", collectionController.getCollectionsQuery);
collectionRouter.get("/collection/:id", collectionController.getCollection);
collectionRouter.post("/collection", collectionController.addCollection);
collectionRouter.put("/collection/:id", collectionController.updateCollection);
collectionRouter.delete(
    "/collection/:id",
    collectionController.deleteCollection
);

export default collectionRouter;
