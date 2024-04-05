"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const emailValidator_1 = require("../libs/emailValidator");
const role_enum_1 = require("../enums/role.enum");
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
/**
 * Permite representar un esquema de mongoose para un determinado "Usuario"
 */
const UserSchema = new mongoose_1.Schema({
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
        validate: [emailValidator_1.isEmail, "Introduzca un email válido"],
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
        enum: role_enum_1.Role,
        default: role_enum_1.Role.PLAYER,
    },
}, { timestamps: true });
// Agrego pligin para tener paginación de consulta de datos
UserSchema.plugin(mongoose_paginate_v2_1.default);
/**
 * Representa un modelo de mongoose para un "Usuario"
 */
const UserModel = (0, mongoose_1.model)("User", UserSchema);
exports.default = UserModel;
