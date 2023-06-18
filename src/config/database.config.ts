import mongoose from "mongoose";
import { env } from "./env.config";

const URI = env.MONGODB_URI;

/**
 * Función que permite realizar una conexión a la Base de Datos de MongoDB
 */
export function connectDatabase() {
    mongoose
        .connect(URI)
        .then((_db) => console.log("Database is connected"))
        .catch((error) => console.log(error));
}
