import { Document } from 'mongoose';
interface PlayListInterface extends Document {
    nombre: string;
    generos: string[];
    canciones: string[];
    duracion: string;
}
export declare const Playlist: import("mongoose").Model<PlayListInterface, {}, {}>;
export {};
