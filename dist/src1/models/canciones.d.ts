import { Document } from 'mongoose';
interface CancionInterface extends Document {
    nombre: string;
    autor: string;
    duracion: string;
    generos: string[];
    single: boolean;
    reproducciones: number;
}
export declare const Cancion: import("mongoose").Model<CancionInterface, {}, {}>;
export {};
