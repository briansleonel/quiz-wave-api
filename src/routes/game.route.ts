import { Router } from "express";
import gameController from "../controllers/game.controller";

const gameRouter = Router();

gameRouter.get("/questions/:category/:limit?", gameController.playGame);
gameRouter.get("/categories", gameController.getCategoriesGame);

export default gameRouter;
