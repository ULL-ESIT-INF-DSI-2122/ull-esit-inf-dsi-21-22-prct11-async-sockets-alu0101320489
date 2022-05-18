/**
 * Clase que representa un grupo
 */
export declare class Grupo {
    private nombre_;
    private componentes_;
    private añoCreacion_;
    private generos_;
    private albumes_;
    private oyentesMensuales_;
    /**
     *
     * @param nombre_ nombre
     * @param componentes_ componenetes
     * @param añoCreacion_ año de creacion
     * @param generos_ generos
     * @param albumes_ albumes
     * @param oyentesMensuales_ oyentes
     */
    constructor(nombre_: string, componentes_: string[], /* o Artista*/ añoCreacion_: number, generos_: string[], albumes_: string[], oyentesMensuales_: number);
    /**
     *
     * @returns nombre
     */
    getNombre(): string;
    /**
     *
     * @returns componentes
     */
    getComponentes(): string[];
    /**
     *
     * @returns año
     */
    getAñoCreacion(): number;
    /**
     *
     * @returns generos
     */
    getGeneros(): string[];
    /**
     *
     * @returns albumes
     */
    getAlbumes(): string[];
    /**
     *
     * @returns oyentes
     */
    getOyentes(): number;
    /**
     *
     * @param nombre nombre
     */
    setNombre(nombre: string): void;
    /**
     *
     * @param componentes componentes
     */
    setComponentes(componentes: string[]): void;
    /**
     *
     * @param añocreacion año
     */
    setAñoCreacion(añocreacion: number): void;
    /**
     *
     * @param generos generos
     */
    setGeneros(generos: string[]): void;
    /**
     *
     * @param albumes albumes
     */
    setAlbumes(albumes: string[]): void;
    /**
     *
     * @param oyentes oyentes
     */
    setOyentes(oyentes: number): void;
    /**
     * Muestra la informacion de un grupo
     */
    printData(): void;
}
/**
   * Clase que representa un colección de grupos y permite acceder a la base de datos y administrar grupos
   */
export declare class JsonGrupoCollection {
    coleccion: Grupo[];
    private displayMod;
    private database;
    /**
       * Constructor que lee un archivo .json donde se encuentran la grupos y las introduce en un array como objetos Grupo
       * @param coleccion Coleccion de grupos
       */
    constructor(coleccion: Grupo[]);
    /**
     * Añade un grupo
     * @param n nombre
     * @param c componentes
     * @param a autores
     * @param g generos
     * @param alb albumes
     * @param o oyentes
     */
    addGrupo(n: string, c: string[], a: number, g: string[], alb: string[], o: number): void;
    /**
     * Elimina un grupo a la coleccion y a la base de datos
     * @param n nombre
     */
    deleteGrupo(n: string): void;
    /**
     * Elimina varios grupos
     * @param gs grupos
     */
    deleteGrupoVector(gs: string[]): void;
    /**
     *
     * @param n indice del grupo
     * @returns grupo
     */
    getGrupo(n: number): Grupo;
    /**
     *
     * @param n nombre
     * @returns se encuentra o no
     */
    includesGrupo(n: string): boolean;
    /**
     *
     * @param n nombre
     * @returns grupo coincidente
     */
    getGrupoByName(n: string): Grupo | undefined;
    /**
     * Muestra los grupos
     */
    displayGrupos(): void;
}
