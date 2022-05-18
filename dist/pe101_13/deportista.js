"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Deportista = void 0;
const mongoose_1 = require("mongoose");
const validator_1 = __importDefault(require("validator"));
/* Creación de un esquema para el modelo Deportista. */
const DeportistaSchema = new mongoose_1.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true,
        validate: (value) => {
            if (!value.match(/^[A-Z]/)) {
                throw new Error('El nombre de un Deportista debe comenzar por mayuscula.');
            }
        },
    },
    apellidos: {
        type: String,
        required: true,
        validate: (value) => {
            if (!value.match(/^[A-Z]/)) {
                throw new Error('Los apellidos nombre de un Deportista debe comenzar por mayuscula.');
            }
        },
    },
    NIF: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        validate: (value) => {
            if (!value.match(/[A-Z0-9]/)) {
                throw new Error('El DNI de un Deportista debe tener mayusculas y números.');
            }
            else if (!validator_1.default.isAlphanumeric(value)) {
                throw new Error('El DNI de un Deportista solo puede contener caracteres alfanumericos');
            }
        },
    },
    edad: {
        type: Number,
        required: true,
    },
    deporte: {
        type: String,
        required: true,
        enum: ['atletismo', 'natacion', 'ciclismo'],
    },
    prueba: {
        type: String,
        required: true,
    },
    PB: {
        type: Number,
        required: true,
    },
});
/* Exportando el modelo `Deportista` con el esquema `DeportistaSchema`. */
exports.Deportista = (0, mongoose_1.model)('Deportista', DeportistaSchema);
