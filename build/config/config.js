"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    PORT: Number(process.env.PORT) || 3001,
    HOSTNAME: process.env.HOSTNAME || "localhost",
    MONGODB_URI: process.env.MONGODB_URI || "mongodb://0.0.0.0:27017/quizz-game",
    TOKEN_SECRET: "development",
};
exports.default = config;
