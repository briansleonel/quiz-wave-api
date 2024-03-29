import jwt from "jsonwebtoken";
import config from "../config/config";
import { Types } from "mongoose";
import { UserPayload } from "../types/payload";
import { IdParams, TypedRequest } from "../types/request";

/**
 * Permite representar los datos que se incluiran en el token
 */
export interface Payload {
    id: string | Types.ObjectId;
    role: string;
}

/**
 * Permite crear un token de acceso
 *
 * @param payload datos para el token
 * @returns token creado
 */
export async function createAccessToken(payload: Payload) {
    return new Promise((resolve, reject) => {
        jwt.sign(
            payload,
            config.TOKEN_SECRET,
            { expiresIn: "1d" },
            (err, token) => {
                if (err) reject(err);
                resolve(token);
            }
        );
    });
}

/**
 * Permite extraer los datos almacenados en el token
 *
 * @param token el token enviado por el cliente
 * @returns datos del token
 */
export function getUserDataToken(token: string) {
    return jwt.decode(token);
}

/**
 * Permite decodificar los datos lamacenados en el Header de la solicitud y devolver los datos del mismo
 * @param req request de la petición HTTP
 * @returns los datos almacenados en el token
 */
export function getDataToken<T>(req: TypedRequest<T, IdParams>) {
    const token = req.headers.authorization!.split(" ")[1];

    return getUserDataToken(token) as UserPayload;
}
