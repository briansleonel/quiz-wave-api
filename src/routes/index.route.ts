import { Router } from "express";
import questionRouter from "./question.route";
import questionCategoryRouter from "./questionCategory.route";
import userRouter from "./user.route";
import collectionRouter from "./collection.route";
import authRouter from "./authentication.route";
import gameRouter from "./game.route";

const router = Router();

router.use("/questions", questionRouter);
router.use("/categories", questionCategoryRouter);
router.use("/users", userRouter);
router.use("/collections", collectionRouter);
router.use("/game", gameRouter);
router.use("/", authRouter);

export default router;
