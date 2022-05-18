"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonGeneroCollection = exports.Genero = void 0;
const lowdb_1 = __importDefault(require("lowdb"));
const FileSync_1 = __importDefault(require("lowdb/adapters/FileSync"));
/**
 * Clase que representa un genero
 */
class Genero {
    /**
     *
     * @param nombre_ nombre del genero
     * @param grupos_  grupos pertenecientes
     * @param artistas_ artistas pertenecientes
     * @param albumes_ albumes pertenecientes
     * @param canciones_ canciones pertenecientes
     */
    constructor(nombre_, grupos_, /* hay que hacer una interfaz generica para no usar union de tipos*/ artistas_, albumes_, canciones_) {
        this.nombre_ = nombre_;
        this.grupos_ = grupos_;
        this.artistas_ = artistas_;
        this.albumes_ = albumes_;
        this.canciones_ = canciones_;
    }
    /**
     *
     * @returns retorna nombre
     */
    getNombre() {
        return this.nombre_;
    }
    /**
     *
     * @returns retorna grupos
     */
    getGrupos() {
        return this.grupos_;
    }
    /**
     *
     * @returns retorna artistas
     */
    getArtistas() {
        return this.artistas_;
    }
    /**
     *
     * @returns retorna albumes
     */
    getAlbumes() {
        return this.albumes_;
    }
    /**
     *
     * @returns retorna canciones
     */
    getCanciones() {
        return this.canciones_;
    }
    /**
     *
     * @param nombre nombre del genero
     */
    setNombre(nombre) {
        this.nombre_ = nombre;
    }
    /**
     *
     * @param grupos grupos del genero
     */
    setGrupos(grupos) {
        this.grupos_ = grupos;
    }
    /**
     *
     * @param artistas artistas del genero
     */
    setArtistas(artistas) {
        this.artistas_ = artistas;
    }
    /**
     *
     * @param albumes albumes del genero
     */
    setAlbumes(albumes) {
        this.albumes_ = albumes;
    }
    /**
     *
     * @param canciones canciones del genero
     */
    setCanciones(canciones) {
        this.canciones_ = canciones;
    }
    /**
       * Imprime la información de una canción
       */
    printData() {
        console.log(this.nombre_);
        console.log('Grupos:');
        this.grupos_.forEach((g) => {
            console.log('   ', g);
        });
        console.log('Artistas:');
        this.artistas_.forEach((a) => {
            console.log('   ', a);
        });
        console.log('Albumes:');
        this.albumes_.forEach((a) => {
            console.log('   ', a);
        });
        console.log('Canciones:');
        this.canciones_.forEach((c) => {
            console.log('   ', c);
        });
    }
}
exports.Genero = Genero;
/**
   * Clase que representa un colección de generos y permite acceder a la base de datos y administrar generos
   */
class JsonGeneroCollection {
    /**
     * Constructor que lee un archivo .json donde se encuentran la generos y las introduce en un array como objetos Generos
     * @param coleccion Coleccion de generos
     */
    constructor(coleccion) {
        this.coleccion = coleccion;
        this.database = (0, lowdb_1.default)(new FileSync_1.default("dataBase/db_generos.json"));
        if (this.database.has("generos").value()) {
            let dbItems = this.database.get("generos").value();
            dbItems.forEach(item => this.coleccion.push(new Genero(item.nombre, item.grupos, item.artistas, item.albumes, item.canciones)));
        }
        this.displayMod = this.coleccion;
    }
    /**
     * Añade un generos a la coleccion y a la base de datos
     * @param n nombre
     * @param g grupos
     * @param art artistas
     * @param alb albumes
     * @param c canciones
     */
    addGenero(n, g, art, alb, c) {
        this.coleccion.push(new Genero(n, g, art, alb, c));
        this.database.get("generos").push({ nombre: n, grupos: g, artistas: g, albumes: alb, canciones: c }).write();
    }
    /**
     * Elimina un genero a la coleccion y a la base de datos
     * @param n nombre del genero
     */
    deleteGenero(n) {
        this.database.get("generos").remove({ nombre: n }).write();
        this.coleccion = this.coleccion.filter(element => { element.getNombre() !== n; });
    }
    /**
   * Elimina varias generos a la coleccion y a la base de datos
   * @param cs generos
   */
    deleteGeneroVector(gs) {
        gs.forEach(e => {
            this.database.get("generos").remove({ nombre: e }).write();
            this.coleccion = this.coleccion.filter(buenas => { buenas.getNombre() !== e; });
        });
    }
    /**
     *
     * @param n indice del genero
     * @returns genero
     */
    getGenero(n) {
        return this.coleccion[n];
    }
    /**
     *
     * @param n nombre del genero
     * @returns se encuentra o no
     */
    includesGenero(n) {
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
     * @param n nombre del genero
     * @returns genero coincidente
     */
    getGeneroByName(n) {
        return this.coleccion.find((element) => {
            element.getNombre() === n;
        });
    }
    /**
   * Muestra las informacion de los generos
   */
    displayGeneros() {
        console.log('──────────────────────────');
        this.coleccion.forEach((genero) => {
            genero.printData();
            console.log('──────────────────────────');
        });
    }
}
exports.JsonGeneroCollection = JsonGeneroCollection;
