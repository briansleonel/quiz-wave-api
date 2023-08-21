import { Document, PaginateModel, Schema, model } from "mongoose";
import { isEmail } from "../libs/emailValidator";
import { Role } from "../libs/role.enum";
import paginate from "mongoose-paginate-v2";
import { IUser } from "../types/user";

/**
 * Permite representar un esquema de mongoose para un determinado "Usuario"
 */
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
            default: false,
        },
        role: {
            type: String,
            enum: Role,
            default: Role.PLAYER,
        },
    },
    { timestamps: true }
);

// Agrego pligin para tener paginación de consulta de datos
UserSchema.plugin(paginate);

// interfaz representando el esquema como un documento de mongoose
interface UserDocument extends Document, IUser {}

/**
 * Representa un modelo de mongoose para un "Usuario"
 */
const UserModel = model<UserDocument, PaginateModel<UserDocument>>(
    "User",
    UserSchema
);

export default UserModel;
