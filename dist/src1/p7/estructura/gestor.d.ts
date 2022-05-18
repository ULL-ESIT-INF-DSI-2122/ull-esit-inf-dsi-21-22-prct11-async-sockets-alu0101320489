import * as can from "./cancion";
import * as pla from "./playlist";
/**
 * enum para seleccionar que atributo quiere modificar en algunos metodos
 */
declare enum Att {
    Nombre = 0,
    Autor = 1,
    Canciones = 2,
    Duracion = 3,
    Generos = 4
}
/**
 * Clase Gestor, para manejar la informacion relacionada con las playlist y cada una de
 * sus propiedades
 */
export declare class Gestor extends pla.JsonPlayListCollection {
    /**
     * Acceso a la base de datos de las canciones para obtener los datos necesarios para ordenar
     */
    private dbCanciones;
    private selectedPlaylist;
    private actualPlaylistSongs;
    private user;
    /**
     * Inicializa la coleccion de playlists
     */
    constructor();
    /**
     *
     * @param nuevo si es nueva la playlist o es sobre una existente
     * @param existente el identificador de la playlist existente
     * @param n nombre
     * @parvam a autors
     * @param d duracion en s
     * @param c vector de cancionetring
     * @param g vector de generos
     */
    addPlayList(nuevo: boolean, existente: number | undefined, n: string, a: string, c: string[], d: string, g: string[]): void;
    /**
     * @param n nombre de la playlist a eliminar
     * @param ususario nombre del usuario para ver si puede o no eliminar la playlist
     */
    deletePlayList(n: string, ususario: string): void;
    /**
     *
     * @param gs vector de playlist a eliminar
     */
    deletePlayListVector(gs: string[]): void;
    /**
     * obtiene una playlist
     * @param n nombre
     * @returns la playlist deseada
     */
    getPlayList(n: number): pla.PlayList;
    /**
     *
     * @param n nombre de la playlist a buscar
     * @returns verdadero o falso dependiendo si la playlist esta o no registrada
     */
    includesPlayList(n: string): boolean;
    /**
     *
     * @param asc selector del orden a imprimir
     * @returns un vector de playlist ordenado
     */
    ordAlfabeticoTitulo(asc: boolean): pla.PlayList[];
    /**
     *
     * @param n nombre de la playlist a obtener
     * @returns la playlist en cuestion o undefined si no se encuentra registrada
     */
    getPlayListByName(n: string): pla.PlayList | undefined; /**
     *
     * @returns el vector de las canciones de la playlist actual
     */
    getActualSongs(): string[];
    /**
     *
     * @param s selecciona una playlist de nombre s
     */
    setSelectedPlaylist(s: string): void;
    /**
     *
     * @param s nombre de la cancion a añadir a la playlist
     */
    addSongToActualPlaylist(s: string): void;
    /**
     * Añade una serie de canciones a la playlist
     * @param s vector de canciones
     */
    addSongVectorToActualPlaylist(s: string[]): void;
    /**
     * Borra una cancion de la playlist
     * @param s nombre de la cancion
     */
    deleteSongFromActualPlaylist(s: string): void;
    /**
     * Borra una serie de canciones de la playlist
     * @param s nombres de la canciones a borrar
     */
    deleteSongVectorFromActualPlaylist(s: string[]): void;
    /**
     *
     * @returns un vector que contiene todas las canciones registradas
     */
    getTodasCanciones(): can.Cancion[];
    /**
     * Usa un metodo generico para asignar un valor de un determinado
     * tipo en tiempo de ejecucion
     * @param n  nombre d ela playlist
     * @param a atributo a modificar
     * @param value valor a asignar
     */
    modifyPlaylist<T>(n: string, a: Att, value: T): void;
    /**
     * ORdena en orden alfabetico de los nombres de las canciones
     * @param asc si la ordenacion es ascendente o no
     * @param n playlist a ordenar
     */
    ordAlfPlaylistCan(asc: boolean, n: string): void;
    /**
     * ORdena en orden alfabetico de los autores de las canciones
     * @param asc si la ordenacion es ascendente o no
     * @param n playlist a ordenar
     */
    ordAlfPlaylistAut(asc: boolean, n: string): void;
    /**
   * ORdena en orden alfabetico de los generos de las canciones
   * @param asc si la ordenacion es ascendente o no
   * @param n playlist a ordenar
   */
    ordAlfPlaylistGenero(asc: boolean, n: number): void;
    /**
   * ORdena en orden alfabetico de los años de las canciones
   * @param asc si la ordenacion es ascendente o no
   * @param n playlist a ordenar
   */
    ordPlaylistAño(asc: boolean, n: number): void;
    /**
   * ORdena en orden alfabetico de la duracion de las canciones
   * @param asc si la ordenacion es ascendente o no
   * @param n playlist a ordenar
   */
    ordPlaylistDur(asc: boolean, n: number): void;
    /**
   * ORdena en orden alfabetico del numero de canciones
   * @param asc si la ordenacion es ascendente o no
   * @param n playlist a ordenar
   */
    ordPlaylistNum(asc: boolean, n: number): void;
    /**
   * ORdena en orden alfabetico de las reproduccioness de las canciones
   * @param asc si la ordenacion es ascendente o no
   * @param n playlist a ordenar
   */
    ordReproduccionesPlaylist(asc: boolean, n: number): void;
    /**
     * Muestra las canciones de la playlist que esta seleccionada para manejar
     */
    displayPlaylistSongs(): void;
}
export {};
