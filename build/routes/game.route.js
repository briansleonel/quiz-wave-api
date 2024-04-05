"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const game_controller_1 = __importDefault(require("../controllers/game.controller"));
const gameRouter = (0, express_1.Router)();
gameRouter.get("/questions/:category/:limit?", game_controller_1.default.playGame);
gameRouter.get("/categories", game_controller_1.default.getCategoriesGame);
exports.default = gameRouter;
