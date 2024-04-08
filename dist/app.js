"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_ui_dist_1 = __importDefault(require("swagger-ui-dist"));
const errorHandler_middleware_1 = require("./middlewares/errorHandler.middleware");
const index_route_1 = __importDefault(require("./routes/index.route"));
const swagger_config_1 = require("./config/swagger.config");
const app = (0, express_1.default)();
// Middlewares
app.use(express_1.default.json()); // Permitir la conversion del req.body en un objeto de js
app.use((0, morgan_1.default)("dev")); // Hacemos uso del HTTP Request Logger con la configuración dev
app.use((0, cookie_parser_1.default)()); // Permitir req.cookies se transofrmen a onjeto de js
app.use((0, cors_1.default)()); // Uso de cors
app.use(express_1.default.static(swagger_ui_dist_1.default.getAbsoluteFSPath()));
/*
app.use(
    cors({
        origin: ["http://localhost:3000", "http://localhost:5173"]
        credentials: true,
    })
);
*/
// Routes
app.use("/api", index_route_1.default);
// Middleware Response
app.use(errorHandler_middleware_1.errorHandlerMiddleware);
// Swagger
app.use("/api/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_config_1.swaggerSpec, swagger_config_1.swaggerCustom));
exports.default = app;
