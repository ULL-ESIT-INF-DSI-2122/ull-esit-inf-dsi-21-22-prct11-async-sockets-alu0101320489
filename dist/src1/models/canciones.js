"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cancion = void 0;
const mongoose_1 = require("mongoose");
const validator_1 = __importDefault(require("validator"));
/* Definición del esquema para el modelo Cancion. */
const CancionSchema = new mongoose_1.Schema({
    nombre: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        validate: (value) => {
            if (!value.match(/^[A-Z]/)) {
                throw new Error('El nombre de una cancion debe comenzar por mayuscula.');
            }
            else if (!validator_1.default.isAlphanumeric(value)) {
                throw new Error('El nombre de una cancion solo puede contener caracteres alfanumericos');
            }
        },
    },
    autor: {
        type: String,
        required: true,
        trim: true,
        validate: (value) => {
            if (!value.match(/^[A-Z]/)) {
                throw new Error('El autor de una cancion debe comenzar por mayuscula.');
            }
            else if (!validator_1.default.isAlphanumeric(value)) {
                throw new Error('El autor de una cancion solo puede contener caracteres alfanumericos');
            }
        },
    },
    duracion: {
        type: String,
        required: true,
        trim: true,
        //validate: (value: string) => {validDuration(value)},
    },
    generos: {
        type: [String],
        required: true,
    },
    single: {
        type: Boolean,
        required: true,
    },
    reproducciones: {
        type: Number,
        required: true,
    },
});
/* Exportando el modelo Canción. */
exports.Cancion = (0, mongoose_1.model)('Cancion', CancionSchema);
