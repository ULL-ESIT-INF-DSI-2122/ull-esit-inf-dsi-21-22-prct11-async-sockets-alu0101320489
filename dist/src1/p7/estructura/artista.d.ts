/**
 * Clase que representa un artista
 */
export declare class Artista {
    private nombre_;
    private grupos_;
    private generos_;
    private albumes_;
    private canciones_;
    private oyentesMensuales_;
    /**
     * Constructor de clase que calcula el atributo de oyentes sumando los oyentes de sus canciones indeivudales y grupales
     * @param nombre_
     * @param grupos_
     * @param generos_
     * @param albumes_
     * @param canciones_
     */
    constructor(nombre_: string, grupos_: string[], generos_: string[], albumes_: string[], canciones_: string[]);
    /**
     *
     * @returns nombre
     */
    getNombre(): string;
    /**
     *
     * @returns grupos
     */
    getGrupos(): string[];
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
     * @returns canciones
     */
    getCanciones(): string[];
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
     * @param grupos grupos
     */
    setGrupos(grupos: string[]): void; /**
       *
       * @param generos generos
       */
    setGeneros(generos: string[]): void; /**
       *
       * @param albumes albumes
       */
    setAlbumes(albumes: string[]): void;
    /**
     *
     * @param canciones canciones
     */
    setCanciones(canciones: string[]): void;
    /**
     *
     * @param oyentes oyentes
     */
    setOyentes(oyentes: number): void;
    /**
     * muestra la informacion de la clase
     */
    printData(): void;
}
/**
 * Clase que representa un colección de artistas y permite acceder a la base de datos y administrar artistas
 */
export declare class JsonArtistaCollection {
    coleccion: Artista[];
    private displayMod;
    private database;
    constructor(coleccion: Artista[]);
    /**
     * Añade un artista
     * @param n nombre
     * @param g grupos
     * @param gen generos
     * @param alb albumes
     * @param c canciones
     */
    addArtista(n: string, g: string[], gen: string[], alb: string[], c: string[]): void;
    /**
     * Elimina un artista
     * @param n nombre
     */
    deleteArtista(n: string): void;
    /**
     * Elimina varios artistas
     * @param gs artistas
     */
    deleteArtistaVector(gs: string[]): void;
    /**
     *
     * @param n indice
     * @returns artista
     */
    getArtista(n: number): Artista;
    /**
     *
     * @param n nombre
     * @returns existe o no
     */
    includesArtista(n: string): boolean;
    /**
     *
     * @param n nombre
     * @returns artista coindicente
     */
    getArtistaByName(n: string): Artista | undefined;
    /**
     * Muestra la informacion de los artistas
     */
    displayOrdenedArtistas(): void;
}
