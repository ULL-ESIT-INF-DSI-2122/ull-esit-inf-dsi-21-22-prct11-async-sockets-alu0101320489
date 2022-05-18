import { Document } from 'mongoose';
interface DeportistaInterface extends Document {
    nombre: string;
    apellidos: string;
    NIF: string;
    edad: number;
    deporte: string;
    prueba: string;
    PB: number;
}
export declare const Deportista: import("mongoose").Model<DeportistaInterface, {}, {}>;
export {};
