//import "dotenv/config"; // Importación de la configuración de dotenv para variables de entorno
import app from "./app";
import { connectDatabase } from "./config/database.config";
import { env } from "./config/env.config";

const PORT = env.PORT;
const HOSTNAME = env.HOSTNAME;

connectDatabase(); // Se realiza la conexión a la base de datos

app.get("/", (_req, res) => {
    res.send("Server started");
});

app.listen(PORT, HOSTNAME, () => {
    console.log(`Server started http://${HOSTNAME}:${PORT}`);
});
