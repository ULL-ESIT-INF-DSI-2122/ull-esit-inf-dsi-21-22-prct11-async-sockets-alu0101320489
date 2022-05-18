import { Document } from 'mongoose';
interface ArtistaInterface extends Document {
    nombre: string;
    generos: string[];
    canciones: string[];
    oyentesmensuales: number;
}
export declare const Artista: import("mongoose").Model<ArtistaInterface, {}, {}>;
export {};
