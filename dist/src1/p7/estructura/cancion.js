"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonCancionCollection = exports.Cancion = void 0;
const lowdb_1 = __importDefault(require("lowdb"));
const FileSync_1 = __importDefault(require("lowdb/adapters/FileSync"));
/**
 * Clase que representa una canción
 */
class Cancion {
    /**
     * Constructor
     * @param nombre_ nombre de la cancion
     * @param autor_ autor
     * @param generos_ generos
     * @param duracion_ duración
     * @param single_ es single o no
     * @param reproducciones_ numero de reproducciones
     */
    constructor(nombre_, autor_, generos_, duracion_, single_, reproducciones_) {
        this.nombre_ = nombre_;
        this.autor_ = autor_;
        this.generos_ = generos_;
        this.duracion_ = duracion_;
        this.single_ = single_;
        this.reproducciones_ = reproducciones_;
    }
    /**
     *
     * @returns retorna el nombre
     */
    getNombre() {
        return this.nombre_;
    }
    /**
     *
     * @returns retorna el autor
     */
    getAutor() {
        return this.autor_;
    }
    /**
     *
     * @returns retorna los generos
     */
    getGeneros() {
        return this.generos_;
    }
    /**
     *
     * @returns retorna la duracion
     */
    getDuracion() {
        return this.duracion_;
    }
    /**
     *
     * @returns retorna si es single
     */
    getSingle() {
        return this.single_;
    }
    /**
     *
     * @returns retorna la reproducciones
     */
    getReproducciones() {
        return this.reproducciones_;
    }
    /**
     *
     * @param nombre nombre de la cancion
     */
    setNombre(nombre) {
        this.nombre_ = nombre;
    }
    /**
     *
     * @param autor autor de la cancion
     */
    setAutor(autor) {
        this.autor_ = autor;
    }
    /**
     *
     * @param genero generos de la cancion
     */
    setGeneros(genero) {
        this.generos_ = genero;
    }
    /**
     *
     * @param duracion duración de la canción
     */
    setDuracion(duracion) {
        this.duracion_ = duracion;
    }
    /**
     *
     * @param single tipo de cancion
     */
    setSingle(single) {
        this.single_ = single;
    }
    /**
     *
     * @param reproducciones reproducciones de la canción
     */
    setReproducciones(reproducciones) {
        this.reproducciones_ = reproducciones;
    }
    /**
     * Imprime la información de una canción
     */
    printData() {
        console.log(this.nombre_, (this.single_) ? ' Single' : '');
        console.log('Autor: ', this.autor_);
        console.log('Genero: ', this.autor_);
        console.log('D: ', this.duracion_, ' R: ', this.reproducciones_);
    }
    /**
     *
     * @returns Funciona para poder pasar a formato .json
     */
    convertJSON() {
        return [this.nombre_, this.autor_, this.generos_, this.duracion_, this.single_, this.reproducciones_];
    }
}
exports.Cancion = Cancion;
/**
 * Clase que representa un colección de canciones y permite acceder a la base de datos y administrar canciones
 */
class JsonCancionCollection {
    /**
     * Constructor que lee un archivo .json donde se encuentran la canciones y las introduce en un array como objetos Canciones
     * @param coleccion Coleccion de canciones
     */
    constructor(coleccion) {
        this.coleccion = coleccion;
        this.database = (0, lowdb_1.default)(new FileSync_1.default("dataBase/db_canciones.json"));
        if (this.database.has("canciones").value()) {
            let dbItems = this.database.get("canciones").value();
            dbItems.forEach(item => this.coleccion.push(new Cancion(item.nombre, item.autor, item.generos, item.duracion, item.single, item.reproducciones)));
        }
        this.displayMod = this.coleccion;
    }
    /**
     * Añade una cancion a la coleccion y a la base de datos
     * @param n nombre
     * @param a autor
     * @param g generos
     * @param d duracion
     * @param s single
     * @param r reproducciones
     */
    addCancion(n, a, g, d, s, r) {
        this.coleccion.push(new Cancion(n, a, g, d, s, r));
        this.database.get("canciones").push({ nombre: n, autor: a, generos: g, duracion: d, single: s, reproducciones: r }).write();
    }
    /**
     * Elimina una cancion a la coleccion y a la base de datos
     * @param n nombre de la cancion
     */
    deleteCancion(n) {
        this.database.get("canciones").remove({ nombre: n }).write();
        this.coleccion = this.coleccion.filter(element => {
            element.getNombre() !== n;
        });
    }
    /**
     * Elimina varias canciones a la coleccion y a la base de datos
     * @param cs canciones
     */
    deleteCancionesVector(cs) {
        cs.forEach(e => {
            this.database.get("canciones").remove({ nombre: e }).write();
            this.coleccion = this.coleccion.filter(buenas => {
                buenas.getNombre() !== e;
            });
        });
    }
    /**
     * @returns el vector que contiene todas las canciones
     */
    getCollection() {
        return this.coleccion;
    }
    /**
     *
     * @param n indice de la cancion
     * @returns retorna una cancion
     */
    getCancion(n) {
        return this.coleccion[n];
    }
    /**
     *
     * @param n nombre de la cancion
     * @returns retorna si se encuentra una cancion en la coleccion
     */
    includesCancion(n) {
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
     * @param n nombre de la cancion
     * @returns retorna la cancion coincidente
     */
    getCancionByName(n) {
        return this.coleccion.find(e => e.getNombre() === n);
    }
    // Interfaces
    /**
     *
     * @param s ascendente o descendente
     * @returns canciones ordenadas por singles
     */
    ordSingles(s) {
        if (s) {
            this.displayMod = [];
            this.coleccion.forEach((e) => {
                if (e.getSingle() == true) {
                    this.displayMod.push(e);
                }
            });
        }
        else {
            this.displayMod = this.coleccion;
        }
        return this.displayMod;
    }
    /**
     *
     * @param s ascendente o descendente
     * @returns canciones ordenadas por reproducciones
     */
    ordReproducciones(asc) {
        this.displayMod = this.coleccion;
        if (asc) {
            this.displayMod.sort((a, b) => a.getReproducciones() - b.getReproducciones());
        }
        else {
            this.displayMod.sort((a, b) => b.getReproducciones() - a.getReproducciones());
        }
        return this.displayMod;
    }
    /**
     *
     * @param s ascendente o descendente
     * @returns canciones ordenadas alfabeticamente
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
     * Muestra las informacion de las canciones
     */
    displayCanciones() {
        console.log('──────────────────────────');
        this.coleccion.forEach((cancion) => {
            cancion.printData();
            console.log('──────────────────────────');
        });
    }
    /**
     * Muestra las informacion de las canciones(inquirer)
     */
    displayMode() {
        console.log('──────────────────────────');
        this.displayMod.forEach((cancion) => {
            cancion.printData();
            console.log('──────────────────────────');
        });
    }
}
exports.JsonCancionCollection = JsonCancionCollection;
