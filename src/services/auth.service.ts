import { BadRequestError } from "../libs/api.errors";
import { comparePassword, encryptPassword } from "../libs/bcrypt";
import { createAccessToken } from "../libs/jwt";
import { IUser } from "../types/user";
import userService from "./user.service";

async function login(username: string, password: string) {
    try {
        const userFound = await userService.findUserByUsername(username);

        // verifico si las contraseñas coinciden
        const isMatch = await comparePassword(
            password,
            (
                await userFound
            ).password
        );

        if (!isMatch) throw new BadRequestError("Credenciales inválidas");

        // Creo el token de acceso para el usuario logueado
        const token = await createAccessToken({
            id: userFound._id,
            role: userFound.role,
        });

        // Añadir token en el header como cookie
        /*
        res.setHeader(
            "Set-Cookie",
            cookie.serialize("token", token as string, {
                //httpOnly: true,
                //secure: process.env.NODE_ENV !== "development",
                //sameSite: "strict",
                maxAge: 60 * 60 * 24,
                path: "/",
            })
        );
        */

        //res.setHeader("Authorization", `Bearer ${token as string}`);

        return { token, user: userFound };
    } catch (error) {
        throw error;
    }
}
async function register(user: IUser) {
    try {
        // Encripto la contraseña
        const passwordHashed = await encryptPassword(user.password);

        // Creo el objeto para un nuevo usuario, con la contraseña encryptada
        const userSaved = await userService.addUser({
            ...user,
            password: passwordHashed,
        });

        if (!userSaved)
            throw new BadRequestError("No se pudo registrar el usuario");

        // Creo el token de acceso para el usuario logueado
        const token = await createAccessToken({
            id: userSaved._id,
            role: userSaved.role,
        });

        return { token, user: userSaved };
    } catch (error) {
        throw error;
    }
}

export default { login, register };
