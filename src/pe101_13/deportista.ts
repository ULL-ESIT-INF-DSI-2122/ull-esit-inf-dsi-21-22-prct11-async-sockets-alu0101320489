import { Document, Schema, model } from 'mongoose';
import validator from 'validator';

/* Definición de la interfaz para el modelo. */
interface DeportistaInterface extends Document {
  nombre: string,
  apellidos: string,
  NIF: string,
  edad: number,
  deporte: string,
  prueba: string,
  PB: number
}

/* Creación de un esquema para el modelo Deportista. */
const DeportistaSchema = new Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
    validate: (value: string) => {
      if (!value.match(/^[A-Z]/)) {
        throw new Error('El nombre de un Deportista debe comenzar por mayuscula.');
      }
    },
  },
  apellidos: {
    type: String,
    required: true,
    validate: (value: string) => {
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
    validate: (value: string) => {
      if (!value.match(/[A-Z0-9]/)) {
        throw new Error('El DNI de un Deportista debe tener mayusculas y números.');
      } else if (!validator.isAlphanumeric(value)) {
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
export const Deportista = model<DeportistaInterface>('Deportista', DeportistaSchema);