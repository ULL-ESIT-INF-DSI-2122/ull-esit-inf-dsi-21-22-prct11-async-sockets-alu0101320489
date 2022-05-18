"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Playlist = void 0;
const mongoose_1 = require("mongoose");
const validator_1 = __importDefault(require("validator"));
/* Definición del esquema para el modelo PlayList. */
const PlayListSchema = new mongoose_1.Schema({
    name: {
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
    generos: {
        type: [String],
        required: true,
    },
    canciones: {
        type: [String],
        required: true,
    },
    duracion: {
        type: String,
        required: true,
        trim: true,
        //validate: (value: string) => {validDuration(value)},
    },
});
/* Exportando el modelo Playlist, que es un modelo de la interfaz PlayListInterface, que es un modelo
del esquema PlayListSchema. */
exports.Playlist = (0, mongoose_1.model)('PlayList', PlayListSchema);
