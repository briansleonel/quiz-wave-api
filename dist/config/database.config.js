"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDatabase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("./config"));
const URI = config_1.default.MONGODB_URI;
/**
 * Función que permite realizar una conexión a la Base de Datos de MongoDB
 */
function connectDatabase() {
    mongoose_1.default
        .connect(URI)
        .then((_db) => console.log("🟢 Database is connected"))
        .catch((error) => console.log(error));
}
exports.connectDatabase = connectDatabase;
