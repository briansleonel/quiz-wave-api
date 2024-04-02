import { Types } from "mongoose";
import { Role } from "../enums/role.enum";

/**
 * Representa un usua
 */
export interface IUserRequest {
    id: Types.ObjectId,
    role: Role
}

export interface ILogin {
    username: string;
    password: string;
}

export interface IUser extends ILogin {
    email: string;
    firstName: string;
    lastName: string;
    active: boolean;
    verified: boolean;
    role: Role;
}
