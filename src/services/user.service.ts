import { BadRequestError } from "../libs/api.errors";
import userRepository from "../repositories/user.repository";
import { IPagiginOptions } from "../types/pagination";
import { IUser } from "../types/user";

async function getUser(id: string) {
    try {
        const userFound = await userRepository.getUser(id);

        if (!userFound) {
            throw new BadRequestError("Usuario no encontrado");
        }

        return userFound;
    } catch (error) {
        throw error;
    }
}

async function getFilteredUsers(query: any, options: IPagiginOptions) {
    try {
        const users = await userRepository.getFilteredUsers(query, options);
        const { docs, offset, meta, totalDocs, ...restData } = users;

        return {
            data: users.docs,
            pagination: {
                totalData: users.totalDocs,
                ...restData,
            },
            totalDocs,
        };
    } catch (error) {
        throw error;
    }
}

async function addUser(user: IUser) {
    try {
        const userSaved = userRepository.addUser(user);

        if (!userSaved)
            throw new BadRequestError("No se pudo registrar el usuario");

        return userSaved;
    } catch (error) {
        throw error;
    }
}

async function updateUser(user: IUser, id: string) {
    try {
        const userFound = await userRepository.updateUser(user, id);

        if (!userFound) {
            throw new BadRequestError("Usuario no encontrado");
        }

        return userFound;
    } catch (error) {
        throw error;
    }
}

async function changeverifiedUser(id: string) {
    try {
        const userFound = await getUser(id);

        if (!userFound) throw new BadRequestError("No se encontró el usuario");

        const userChanged = await userRepository.changeverifiedUser(
            userFound,
            id
        );

        if (!userChanged)
            throw new BadRequestError("No se puedo cambiar el estado");

        return userChanged;
    } catch (error) {
        throw error;
    }
}

async function deleteUser(id: string) {
    try {
        const userDeleted = await userRepository.deleteUser(id);

        if (!userDeleted)
            throw new BadRequestError("No se pudo eliminar el usuario");

        return userDeleted;
    } catch (error) {
        throw error;
    }
}

async function findUserByUsername(username: string) {
    try {
        const userFound = await userRepository.findUserByUsername(username);

        if (!userFound)
            throw new BadRequestError("Nombre de usuario no encontrado");

        return userFound;
    } catch (error) {
        throw error;
    }
}

export default {
    getUser,
    addUser,
    changeverifiedUser,
    deleteUser,
    getFilteredUsers,
    updateUser,
    findUserByUsername,
};
