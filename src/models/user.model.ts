import { Schema, model } from "mongoose";
import { IUser } from "../interfaces/user.interface";
import { isEmail } from "../libs/emailValidator";
import { Role } from "../libs/role.enum";

const UserSchema = new Schema<IUser>(
    {
        username: {
            type: String,
            required: [true, "Nombre de usuario requerido"],
            unique: true,
            trim: true,
            minlength: [
                5,
                "El username debe tener más de {MINLENGTH} caracteres",
            ],
        },
        password: {
            type: String,
            required: [true, "Contraseña requerida"],
            minlength: [
                8,
                "La contraseña debe tener más de {MINLENGTH} caracteres",
            ],
        },
        email: {
            type: String,
            required: [true, "Email requerido"],
            unique: true,
            trim: true,
            validate: [isEmail, "Introduzca un email válido"],
        },
        firstName: {
            type: String,
            trim: true,
            required: [true, "Nombre requerido"],
            minlength: [
                3,
                "El nombre debe tener más de {MINLENGTH} caracteres",
            ],
        },
        lastName: {
            type: String,
            trim: true,
            required: [true, "Apellido requerido"],
            minlength: [
                3,
                "El apellido debe tener más de {MINLENGTH} caracteres",
            ],
        },
        active: {
            type: Boolean,
            default: true,
        },
        verified: {
            type: Boolean,
            default: true,
        },
        role: {
            type: String,
            enum: Role,
            default: Role.PLAYER,
        },
    },
    { timestamps: true }
);

const UserModel = model("User", UserSchema);

export default UserModel;
