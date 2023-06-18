import "dotenv/config"; // Importación de la configuración de dotenv para variables de entorno

interface Env {
    NODE_ENV?: "development" | "production";
    PORT: number;
    HOSTNAME: string;
    MONGODB_URI: string;
}

export const env: Env = {
    PORT: Number(process.env.PORT),
    HOSTNAME: process.env.HOSTNAME || "localhost",
    MONGODB_URI: process.env.MONGODB_URI || "",
};
