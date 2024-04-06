import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import swaggerUI from "swagger-ui-express";
import swaggerUIDist from "swagger-ui-dist";

import { errorHandlerMiddleware } from "./middlewares/errorHandler.middleware";
import router from "./routes/index.route";
import { swaggerSpec } from "./config/swagger.config";

const app = express();

// Middlewares
app.use(express.json()); // Permitir la conversion del req.body en un objeto de js
app.use(morgan("dev")); // Hacemos uso del HTTP Request Logger con la configuración dev
app.use(cookieParser()); // Permitir req.cookies se transofrmen a onjeto de js
app.use(cors()); // Uso de cors

app.use(express.static(swaggerUIDist.absolutePath()));

/*
app.use(
    cors({
        origin: ["http://localhost:3000", "http://localhost:5173"]
        credentials: true,
    })
);
*/

// Routes
app.use("/api", router);

// Middleware Response
app.use(errorHandlerMiddleware);

// Swagger
app.use("/api/docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

export default app;
