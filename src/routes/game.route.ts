import { Router } from "express";
import gameController from "../controllers/game.controller";

const gameRouter = Router();

gameRouter.get("/game/:category/:limit?", gameController.playGame);
gameRouter.get("/categories/game", gameController.getCategoriesGame);

export default gameRouter;
