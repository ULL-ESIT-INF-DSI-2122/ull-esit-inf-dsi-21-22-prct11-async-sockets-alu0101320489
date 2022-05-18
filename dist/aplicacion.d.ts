export declare class Aplicacion {
    private result;
    constructor();
    /**
     * Funcion que añade una nota
     * @param usuario usuario
     * @param titulo titulo
     * @param data datos
     * @param color color
     */
    add(usuario: string, titulo: string, data: string, color: string): boolean;
    /**
     * Funcion que elimina una nota
     * @param usuario ususario
     * @param titulo titulo
     */
    del(usuario: string, titulo: string): void;
    /**
     * Fucnion que modifica una nota
     * @param usuario usuario
     * @param titulo titulo
     * @param data datos
     * @param color color
     */
    mod(usuario: string, titulo: string, data: string, color: string): void;
    /**
     * Funcion que lista las notas de un usuario
     * @param usuario usuario
     */
    list(usuario: string): void;
    /**
     * Funcion que muestra el contenido de una nota
     * @param usuario usuario
     * @param titulo titulo
     */
    read(usuario: string, titulo: string): void;
    /**
     * Funcion que crea un directorio
     * @param u nombre del usuario
     */
    createDir(u: string): void;
    /**
     * Funcion que muestra un texto en un color
     * @param c color
     * @param data texto
     */
    printColor(c: string, data: string): void;
}
