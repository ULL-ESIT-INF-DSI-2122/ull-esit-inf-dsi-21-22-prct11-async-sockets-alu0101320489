import { CancionOrdenable, CommonOrdenable } from "../Interfaces/BaseInterface";
/**
 * Clase que representa una canción
 */
export declare class Cancion {
    private nombre_;
    private autor_;
    private generos_;
    private duracion_;
    private single_;
    private reproducciones_;
    /**
     * Constructor
     * @param nombre_ nombre de la cancion
     * @param autor_ autor
     * @param generos_ generos
     * @param duracion_ duración
     * @param single_ es single o no
     * @param reproducciones_ numero de reproducciones
     */
    constructor(nombre_: string, autor_: string, generos_: string[], duracion_: string, single_: boolean, reproducciones_: number);
    /**
     *
     * @returns retorna el nombre
     */
    getNombre(): string;
    /**
     *
     * @returns retorna el autor
     */
    getAutor(): string;
    /**
     *
     * @returns retorna los generos
     */
    getGeneros(): string[];
    /**
     *
     * @returns retorna la duracion
     */
    getDuracion(): string;
    /**
     *
     * @returns retorna si es single
     */
    getSingle(): boolean;
    /**
     *
     * @returns retorna la reproducciones
     */
    getReproducciones(): number;
    /**
     *
     * @param nombre nombre de la cancion
     */
    setNombre(nombre: string): void;
    /**
     *
     * @param autor autor de la cancion
     */
    setAutor(autor: string): void;
    /**
     *
     * @param genero generos de la cancion
     */
    setGeneros(genero: string[]): void;
    /**
     *
     * @param duracion duración de la canción
     */
    setDuracion(duracion: string): void;
    /**
     *
     * @param single tipo de cancion
     */
    setSingle(single: boolean): void;
    /**
     *
     * @param reproducciones reproducciones de la canción
     */
    setReproducciones(reproducciones: number): void;
    /**
     * Imprime la información de una canción
     */
    printData(): void;
    /**
     *
     * @returns Funciona para poder pasar a formato .json
     */
    convertJSON(): (number | string | boolean | string[])[];
}
/**
 * Clase que representa un colección de canciones y permite acceder a la base de datos y administrar canciones
 */
export declare class JsonCancionCollection implements CommonOrdenable<Cancion>, CancionOrdenable {
    coleccion: Cancion[];
    private displayMod;
    private database;
    /**
     * Constructor que lee un archivo .json donde se encuentran la canciones y las introduce en un array como objetos Canciones
     * @param coleccion Coleccion de canciones
     */
    constructor(coleccion: Cancion[]);
    /**
     * Añade una cancion a la coleccion y a la base de datos
     * @param n nombre
     * @param a autor
     * @param g generos
     * @param d duracion
     * @param s single
     * @param r reproducciones
     */
    addCancion(n: string, a: string, g: string[], d: string, s: boolean, r: number): void;
    /**
     * Elimina una cancion a la coleccion y a la base de datos
     * @param n nombre de la cancion
     */
    deleteCancion(n: string): void;
    /**
     * Elimina varias canciones a la coleccion y a la base de datos
     * @param cs canciones
     */
    deleteCancionesVector(cs: string[]): void;
    /**
     * @returns el vector que contiene todas las canciones
     */
    getCollection(): Cancion[];
    /**
     *
     * @param n indice de la cancion
     * @returns retorna una cancion
     */
    getCancion(n: number): Cancion;
    /**
     *
     * @param n nombre de la cancion
     * @returns retorna si se encuentra una cancion en la coleccion
     */
    includesCancion(n: string): boolean;
    /**
     *
     * @param n nombre de la cancion
     * @returns retorna la cancion coincidente
     */
    getCancionByName(n: string): Cancion | undefined;
    /**
     *
     * @param s ascendente o descendente
     * @returns canciones ordenadas por singles
     */
    ordSingles(s: boolean): Cancion[];
    /**
     *
     * @param s ascendente o descendente
     * @returns canciones ordenadas por reproducciones
     */
    ordReproducciones(asc: boolean): Cancion[];
    /**
     *
     * @param s ascendente o descendente
     * @returns canciones ordenadas alfabeticamente
     */
    ordAlfabeticoTitulo(asc: boolean): Cancion[];
    /**
     * Muestra las informacion de las canciones
     */
    displayCanciones(): void;
    /**
     * Muestra las informacion de las canciones(inquirer)
     */
    displayMode(): void;
}
