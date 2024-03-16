import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";

import questionCategoryRouter from "./routes/questionCategory.route";
import userRouter from "./routes/user.route";
import questionRouter from "./routes/question.route";
import authRouter from "./routes/authentication.route";
import gameRouter from "./routes/game.route";
import collectionRouter from "./routes/collection.route";
import { errorHandlerMiddleware } from "./middlewares/errorHandler.middleware";

const app = express();

// Middlewares
app.use(express.json()); // Permitir la conversion del req.body en un objeto de js
app.use(morgan("dev")); // Hacemos uso del HTTP Request Logger con la configuración dev
app.use(cookieParser()); // Permitir req.cookies se transofrmen a onjeto de js
app.use(cors()); // Uso de cors

/*
app.use(
    cors({
        origin: ["http://localhost:3000", "http://localhost:5173"]
        credentials: true,
    })
);
*/

// Routes
app.use("/api", userRouter);
app.use("/api", authRouter);
app.use("/api", questionRouter);
app.use("/api", questionCategoryRouter);
app.use("/api", gameRouter);
app.use("/api", collectionRouter);

// Middleware Response
app.use(errorHandlerMiddleware);

export default app;
