import UserModel from "../models/user.model";
import { IPagiginOptions } from "../types/pagination";
import { IUser } from "../types/user";

async function getUser(id: string) {
    return await UserModel.findById(id);
}

async function getFilteredUsers(query: any, options: IPagiginOptions) {
    // Busco los datos y los pagino
    return await UserModel.paginate(query, options);
}
async function addUser(user: IUser) {
    const newUser = new UserModel(user);
    return await newUser.save();
}
async function updateUser(user: IUser, id: string) {
    const userFound = await UserModel.findByIdAndUpdate(id, user, {
        new: true,
    });

    return userFound;
}
async function changeverifiedUser(user: IUser, id: string) {
    return await UserModel.findByIdAndUpdate(
        id,
        { verified: !user.verified },
        {
            new: true,
        }
    );
}
async function deleteUser(id: string) {
    return await UserModel.findByIdAndDelete(id);
}

async function findUserByUsername(username: string) {
    return await UserModel.findOne({ username });
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
