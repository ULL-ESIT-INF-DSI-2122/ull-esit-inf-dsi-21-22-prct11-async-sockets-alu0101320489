"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Artista = void 0;
const mongoose_1 = require("mongoose");
const validator_1 = __importDefault(require("validator"));
/* Creación de un esquema para el modelo artista. */
const ArtistaSchema = new mongoose_1.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        validate: (value) => {
            if (!value.match(/^[A-Z]/)) {
                throw new Error('El nombre de un artista debe comenzar por mayuscula.');
            }
            else if (!validator_1.default.isAlphanumeric(value)) {
                throw new Error('El nombre de un artista solo puede contener caracteres alfanumericos');
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
    oyentesmensuales: {
        type: Number,
        required: true,
    },
});
/* Exportando el modelo `Artista` con el esquema `ArtistaSchema`. */
exports.Artista = (0, mongoose_1.model)('Artista', ArtistaSchema);
