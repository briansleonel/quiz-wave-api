import { Role } from "../libs/role.enum";

export interface IUser {
    username: string;
    password: string;
    email: string;
    firstName: string;
    lastName: string;
    active: boolean;
    verified: boolean;
    role: Role;
}
