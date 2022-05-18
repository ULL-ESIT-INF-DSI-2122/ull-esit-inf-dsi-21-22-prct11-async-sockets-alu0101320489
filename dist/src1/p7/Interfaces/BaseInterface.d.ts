import { Album } from "../estructura/album";
import { Cancion } from "../estructura/cancion";
export interface CommonOrdenable<T> {
    ordAlfabeticoTitulo(asc: boolean): T[];
}
export interface AlbumOrdenable {
    ordAño(asc: boolean): Album[];
}
export interface CancionOrdenable {
    ordReproducciones(asc: boolean): Cancion[];
    ordSingles(s: boolean): Cancion[];
}
