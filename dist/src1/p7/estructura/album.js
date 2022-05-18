"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonAlbumCollection = exports.Album = void 0;
const lowdb_1 = __importDefault(require("lowdb"));
const FileSync_1 = __importDefault(require("lowdb/adapters/FileSync"));
/**
 * Clase que representa un album
 */
class Album {
    /**
     *
     * @param nombre_ nombre
     * @param autor_ autor
     * @param añoPublicacion_ año de publicacion
     * @param generos_ generos
     * @param canciones_ canciones
     */
    constructor(nombre_, autor_, /* o Artista*/ añoPublicacion_, generos_, canciones_) {
        this.nombre_ = nombre_;
        this.autor_ = autor_;
        this.añoPublicacion_ = añoPublicacion_;
        this.generos_ = generos_;
        this.canciones_ = canciones_;
    }
    /**
     *
     * @returns nombre
     */
    getNombre() {
        return this.nombre_;
    }
    /**
     *
     * @returns autor
     */
    getAutor() {
        return this.autor_;
    }
    /**
     *
     * @returns año
     */
    getAño() {
        return this.añoPublicacion_;
    }
    /**
     *
     * @returns generos
     */
    getGeneros() {
        return this.generos_;
    }
    /**
     *
     * @returns canciones
     */
    getCanciones() {
        return this.canciones_;
    }
    /**
     *
     * @param nombre nombre
     */
    setNombre(nombre) {
        this.nombre_ = nombre;
    }
    /**
     *
     * @param autor autor
     */
    setAutor(autor) {
        this.autor_ = autor;
    }
    /**
     *
     * @param año año
     */
    setAño(año) {
        this.añoPublicacion_ = año;
    }
    /**
     *
     * @param genero genero
     */
    setGeneros(genero) {
        this.generos_ = genero;
    }
    /**
     *
     * @param canciones canciones
     */
    setCanciones(canciones) {
        this.canciones_ = canciones;
    }
    /**
     * Muestra la informacion de la clse
     */
    printData() {
        console.log(this.nombre_);
        console.log('Autor: ', this.autor_);
        console.log('Año: ', this.añoPublicacion_);
        console.log('Generos:');
        this.generos_.forEach((g) => {
            console.log('   ', g);
        });
        console.log('Canciones:');
        this.canciones_.forEach((c) => {
            console.log('   ', c);
        });
    }
}
exports.Album = Album;
/**
   * Clase que representa un colección de albumed y permite acceder a la base de datos y administrar albumes
   */
class JsonAlbumCollection {
    /**
     *
     * Constructor que lee un archivo .json donde se encuentran los albumes y las introduce en un array como objetos Album
     * @param coleccion Coleccion de albumes
     */
    constructor(coleccion) {
        this.coleccion = coleccion;
        this.database = (0, lowdb_1.default)(new FileSync_1.default("dataBase/db_albumes.json"));
        if (this.database.has("albumes").value()) {
            let dbItems = this.database.get("albumes").value();
            dbItems.forEach(item => this.coleccion.push(new Album(item.nombre, item.autor, item.año, item.generos, item.canciones)));
        }
        this.displayMod = this.coleccion;
    }
    /**
     * Añade un album a la coleccion y a la base de datos
     * @param n nombre
     * @param aut autor
     * @param a año
     * @param g genero
     * @param c canciones
     */
    addAlbum(n, aut, a, g, c) {
        this.coleccion.push(new Album(n, aut, a, g, c));
        this.database.get("albumes").push({ nombre: n, autor: aut, año: a, generos: g, canciones: c }).write();
        this.displayMod = this.coleccion;
    }
    /**
     * Elimina un album
     * @param n nombre
     */
    deleteAlbum(n) {
        this.database.get("albumes").remove({ nombre: n }).write();
        this.coleccion = this.coleccion.filter(element => { element.getNombre() !== n; });
        this.displayMod = this.coleccion;
    }
    /**
     * Elimina varios albumes
     * @param as albumes
     */
    deleteAlbumVector(as) {
        as.forEach(e => {
            this.database.get("albumes").remove({ nombre: e }).write();
            this.coleccion = this.coleccion.filter(buenas => { buenas.getNombre() !== e; });
        });
        this.displayMod = this.coleccion;
    }
    /**
     *
     * @param n indice
     * @returns album
     */
    getAlbum(n) {
        return this.coleccion[n];
    }
    /**
     *
     * @param n nombre
     * @returns existe o no
     */
    includesAlbum(n) {
        let isIn = false;
        this.coleccion.forEach(element => {
            if (element.getNombre() === n) {
                isIn = true;
            }
        });
        return isIn;
    }
    /**
     *
     * @param n nombre
     * @returns album coincidente
     */
    getAlbumByName(n) {
        return this.coleccion.find((element) => {
            element.getNombre() === n;
        });
    }
    /**
     *
     * @param asc ascendente o descendente
     * @returns ordenado alfabeticamente
     */
    ordAlfabeticoTitulo(asc) {
        this.displayMod = this.coleccion;
        if (asc) {
            this.displayMod.sort((a, b) => a.getNombre().localeCompare(b.getNombre()));
        }
        else {
            this.displayMod.sort((a, b) => b.getNombre().localeCompare(a.getNombre()));
        }
        return this.displayMod;
    }
    /**
     *
     * @param asc ascendente o descendente
     * @returns ordenado por año
     */
    ordAño(asc) {
        this.displayMod = this.coleccion;
        if (asc) {
            this.displayMod.sort((a, b) => a.getAño() - b.getAño());
        }
        else {
            this.displayMod.sort((a, b) => b.getAño() - a.getAño());
        }
        return this.displayMod;
    }
    /**
     * Muestra la informacion de los albumes
     */
    displayOrdenedGeneros() {
        console.log('──────────────────────────');
        this.displayMod.forEach((album) => {
            album.printData();
            console.log('──────────────────────────');
        });
    }
}
exports.JsonAlbumCollection = JsonAlbumCollection;
