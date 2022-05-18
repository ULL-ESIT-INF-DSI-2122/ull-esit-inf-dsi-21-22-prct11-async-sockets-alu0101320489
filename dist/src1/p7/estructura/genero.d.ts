/**
 * Clase que representa un genero
 */
export declare class Genero {
    private nombre_;
    private grupos_;
    private artistas_;
    private albumes_;
    private canciones_;
    /**
     *
     * @param nombre_ nombre del genero
     * @param grupos_  grupos pertenecientes
     * @param artistas_ artistas pertenecientes
     * @param albumes_ albumes pertenecientes
     * @param canciones_ canciones pertenecientes
     */
    constructor(nombre_: string, grupos_: string[], /* hay que hacer una interfaz generica para no usar union de tipos*/ artistas_: string[], albumes_: string[], canciones_: string[]);
    /**
     *
     * @returns retorna nombre
     */
    getNombre(): string;
    /**
     *
     * @returns retorna grupos
     */
    getGrupos(): string[];
    /**
     *
     * @returns retorna artistas
     */
    getArtistas(): string[];
    /**
     *
     * @returns retorna albumes
     */
    getAlbumes(): string[];
    /**
     *
     * @returns retorna canciones
     */
    getCanciones(): string[];
    /**
     *
     * @param nombre nombre del genero
     */
    setNombre(nombre: string): void;
    /**
     *
     * @param grupos grupos del genero
     */
    setGrupos(grupos: string[]): void;
    /**
     *
     * @param artistas artistas del genero
     */
    setArtistas(artistas: string[]): void;
    /**
     *
     * @param albumes albumes del genero
     */
    setAlbumes(albumes: string[]): void;
    /**
     *
     * @param canciones canciones del genero
     */
    setCanciones(canciones: string[]): void;
    /**
       * Imprime la información de una canción
       */
    printData(): void;
}
/**
   * Clase que representa un colección de generos y permite acceder a la base de datos y administrar generos
   */
export declare class JsonGeneroCollection {
    coleccion: Genero[];
    private displayMod;
    private database;
    /**
     * Constructor que lee un archivo .json donde se encuentran la generos y las introduce en un array como objetos Generos
     * @param coleccion Coleccion de generos
     */
    constructor(coleccion: Genero[]);
    /**
     * Añade un generos a la coleccion y a la base de datos
     * @param n nombre
     * @param g grupos
     * @param art artistas
     * @param alb albumes
     * @param c canciones
     */
    addGenero(n: string, g: string[], art: string[], alb: string[], c: string[]): void;
    /**
     * Elimina un genero a la coleccion y a la base de datos
     * @param n nombre del genero
     */
    deleteGenero(n: string): void;
    /**
   * Elimina varias generos a la coleccion y a la base de datos
   * @param cs generos
   */
    deleteGeneroVector(gs: string[]): void;
    /**
     *
     * @param n indice del genero
     * @returns genero
     */
    getGenero(n: number): Genero;
    /**
     *
     * @param n nombre del genero
     * @returns se encuentra o no
     */
    includesGenero(n: string): boolean;
    /**
     *
     * @param n nombre del genero
     * @returns genero coincidente
     */
    getGeneroByName(n: string): Genero | undefined;
    /**
   * Muestra las informacion de los generos
   */
    displayGeneros(): void;
}
