import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import questionCategoryRouter from "./routes/questionCategory.route";
import userRouter from "./routes/user.route";
import questionRouter from "./routes/question.route";
import authRouter from "./routes/authentication.route";

const app = express();

// Middlewares
app.use(express.json()); // Permitir la conversion del req.body en un objeto de js
app.use(morgan("dev")); // Hacemos uso del HTTP Request Logger con la configuración dev
app.use(cookieParser()); // Permitir req.cookies se transofrmen a onjeto de js

// Routes
app.use("/api", userRouter);
app.use("/api", authRouter);
app.use("/api", questionRouter);
app.use("/api", questionCategoryRouter);

export default app;
