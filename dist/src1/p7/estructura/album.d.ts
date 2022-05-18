import { AlbumOrdenable, CommonOrdenable } from "../Interfaces/BaseInterface";
/**
 * Clase que representa un album
 */
export declare class Album {
    private nombre_;
    private autor_;
    private añoPublicacion_;
    private generos_;
    private canciones_;
    /**
     *
     * @param nombre_ nombre
     * @param autor_ autor
     * @param añoPublicacion_ año de publicacion
     * @param generos_ generos
     * @param canciones_ canciones
     */
    constructor(nombre_: string, autor_: string, /* o Artista*/ añoPublicacion_: number, generos_: string[], canciones_: string[]);
    /**
     *
     * @returns nombre
     */
    getNombre(): string;
    /**
     *
     * @returns autor
     */
    getAutor(): string;
    /**
     *
     * @returns año
     */
    getAño(): number;
    /**
     *
     * @returns generos
     */
    getGeneros(): string[];
    /**
     *
     * @returns canciones
     */
    getCanciones(): string[];
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
     * @param año año
     */
    setAño(año: number): void;
    /**
     *
     * @param genero genero
     */
    setGeneros(genero: string[]): void;
    /**
     *
     * @param canciones canciones
     */
    setCanciones(canciones: string[]): void;
    /**
     * Muestra la informacion de la clse
     */
    printData(): void;
}
/**
   * Clase que representa un colección de albumed y permite acceder a la base de datos y administrar albumes
   */
export declare class JsonAlbumCollection implements CommonOrdenable<Album>, AlbumOrdenable {
    coleccion: Album[];
    private displayMod;
    private database;
    /**
     *
     * Constructor que lee un archivo .json donde se encuentran los albumes y las introduce en un array como objetos Album
     * @param coleccion Coleccion de albumes
     */
    constructor(coleccion: Album[]);
    /**
     * Añade un album a la coleccion y a la base de datos
     * @param n nombre
     * @param aut autor
     * @param a año
     * @param g genero
     * @param c canciones
     */
    addAlbum(n: string, aut: string, a: number, g: string[], c: string[]): void;
    /**
     * Elimina un album
     * @param n nombre
     */
    deleteAlbum(n: string): void;
    /**
     * Elimina varios albumes
     * @param as albumes
     */
    deleteAlbumVector(as: string[]): void;
    /**
     *
     * @param n indice
     * @returns album
     */
    getAlbum(n: number): Album;
    /**
     *
     * @param n nombre
     * @returns existe o no
     */
    includesAlbum(n: string): boolean;
    /**
     *
     * @param n nombre
     * @returns album coincidente
     */
    getAlbumByName(n: string): Album | undefined;
    /**
     *
     * @param asc ascendente o descendente
     * @returns ordenado alfabeticamente
     */
    ordAlfabeticoTitulo(asc: boolean): Album[];
    /**
     *
     * @param asc ascendente o descendente
     * @returns ordenado por año
     */
    ordAño(asc: boolean): Album[];
    /**
     * Muestra la informacion de los albumes
     */
    displayOrdenedGeneros(): void;
}
