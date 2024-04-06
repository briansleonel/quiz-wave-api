"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config"); // Importación de la configuración de dotenv para variables de entorno
const app_1 = __importDefault(require("./app"));
const database_config_1 = require("./config/database.config");
const config_1 = __importDefault(require("./config/config"));
const PORT = config_1.default.PORT;
const HOSTNAME = config_1.default.HOSTNAME;
(0, database_config_1.connectDatabase)(); // Se realiza la conexión a la base de datos
app_1.default.listen(PORT, HOSTNAME, () => {
    console.log(`🌐 Server started: http://${HOSTNAME}:${PORT}`);
});
