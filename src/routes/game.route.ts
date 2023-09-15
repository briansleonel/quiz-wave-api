import { Router } from "express";
import gameController from "../controllers/game.controller";

const gameRouter = Router();

gameRouter.get("/game/questions/:category/:limit?", gameController.playGame);
gameRouter.get("/game/categories", gameController.getCategoriesGame);

export default gameRouter;
