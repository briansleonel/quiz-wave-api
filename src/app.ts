import express from "express";
import morgan from "morgan";
import questionCategoryRouter from "./routes/questionCategory.route";
import userRouter from "./routes/user.route";
import questionRouter from "./routes/question.route";

const app = express();

// Middlewares
app.use(express.json()); // Permitir la conversion del req.body en un objeto de js
app.use(morgan("dev")); // Hacemos uso del HTTP Request Logger con la configuración dev

// Routes
app.use("/api", userRouter);
app.use("/api", questionRouter);
app.use("/api/question", questionCategoryRouter);

export default app;
