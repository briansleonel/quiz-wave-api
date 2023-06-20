import "dotenv/config"; // Importación de la configuración de dotenv para variables de entorno
import app from "./app";
import { connectDatabase } from "./config/database.config";
import config from "./config/config";

const PORT = config.PORT;
const HOSTNAME = config.HOSTNAME;

connectDatabase(); // Se realiza la conexión a la base de datos

app.listen(PORT, HOSTNAME, () => {
    console.log(`Server started http://${HOSTNAME}:${PORT}`);
});
