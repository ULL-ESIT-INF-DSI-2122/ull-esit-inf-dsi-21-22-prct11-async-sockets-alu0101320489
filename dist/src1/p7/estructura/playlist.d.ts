import lowdb from "lowdb";
import { schemaPlayList } from "./schema";
import { CommonOrdenable } from "../Interfaces/BaseInterface";
/**
 * Clase que representa un playlist
 */
export declare class PlayList {
    private nombre_;
    private autor_;
    private canciones_;
    private duracion_;
    private generos_;
    private dbCanciones;
    /**
     *
     * @param nombre_ nombre
     * @param autor_ autor
     * @param canciones_ canciones
     * @param duracion_ duracion
     * @param generos_ generos
     */
    constructor(nombre_: string, autor_: string, canciones_: string[], duracion_: string, generos_: string[]);
    /**
     *
     * @returns duracion de la playlist a partir de la de las canciones
     */
    obtainDuracionFromCancion(): string;
    /**
     *
     * @returns nombre
     */
    getNombre(): string;
    /**
     *
     * @returns canciones
     */
    getCanciones(): string[];
    /**
     *
     * @returns duracion
     */
    getDuracion(): string;
    /**
     *
     * @returns generos
     */
    getGeneros(): string[];
    /**
     *
     * @returns autor
     */
    getAutor(): string;
    /**
     *
     * @param nombre nombre
     */
    setNombre(nombre: string): void;
    /**
     *
     * @param autor autor
     */
    setAutor(autor: string): void;
    /**
     *
     * @param canciones canciones
     */
    setCanciones(canciones: string[]): void;
    /**
     *
     * @param duracion duracion
     */
    setDuracion(duracion: string): void;
    /**
     *
     * @param genero generos
     */
    setGeneros(genero: string[]): void;
    /**
     * Muestra la informacion de un playlist
     */
    printData(): void;
}
/**
 * Clase que representa un colección de playlist y permite acceder a la base de datos y administrar Playlist
 */
export declare class JsonPlayListCollection implements CommonOrdenable<PlayList> {
    coleccion: PlayList[];
    protected displayMod: PlayList[];
    protected database: lowdb.LowdbSync<schemaPlayList>;
    /**
     * Constructor que lee un archivo .json donde se encuentran la playlists y las introduce en un array como objetos PLaylist
     * @param coleccion Coleccion de playlists
     */
    constructor(coleccion: PlayList[]);
    /**
     *
     * @returns coleccion
     */
    getCollection(): PlayList[];
    /**
     *
     * @param n indice
     * @returns playlist
     */
    getPlayList(n: number): PlayList;
    /**
     *
     * @param n nombre
     * @returns playlist coincidente
     */
    getPlayListByName(n: string): PlayList | undefined;
    /**
     *
     * @param n nombre
     * @returns existe o no
     */
    includesPlayList(n: string): boolean;
    /**
     *
     * @param asc ascendente o descendente
     * @returns ordenadas alfabeticamente
     */
    ordAlfabeticoTitulo(asc: boolean): PlayList[];
    /**
     *
     * @param asc ascendente o descendente
     * @returns ordenadas por duracion
     */
    ordDuracion(asc: boolean): PlayList[];
    /**
     *
     * @param asc ascendente o descendente
     * @returns ordenadas por reproducciones
     */
    ordReproduccionesPlaylist(asc: boolean, n: number): void;
    /**
     * Muestra informacion de las playlists
     */
    displayOrdenedPlayList(): void;
}
