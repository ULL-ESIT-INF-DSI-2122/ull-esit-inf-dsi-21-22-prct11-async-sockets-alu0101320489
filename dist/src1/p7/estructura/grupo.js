"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonGrupoCollection = exports.Grupo = void 0;
const lowdb_1 = __importDefault(require("lowdb"));
const FileSync_1 = __importDefault(require("lowdb/adapters/FileSync"));
/**
 * Clase que representa un grupo
 */
class Grupo {
    /**
     *
     * @param nombre_ nombre
     * @param componentes_ componenetes
     * @param añoCreacion_ año de creacion
     * @param generos_ generos
     * @param albumes_ albumes
     * @param oyentesMensuales_ oyentes
     */
    constructor(nombre_, componentes_, /* o Artista*/ añoCreacion_, generos_, albumes_, oyentesMensuales_) {
        this.nombre_ = nombre_;
        this.componentes_ = componentes_;
        this.añoCreacion_ = añoCreacion_;
        this.generos_ = generos_;
        this.albumes_ = albumes_;
        this.oyentesMensuales_ = oyentesMensuales_;
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
     * @returns componentes
     */
    getComponentes() {
        return this.componentes_;
    }
    /**
     *
     * @returns año
     */
    getAñoCreacion() {
        return this.añoCreacion_;
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
     * @returns albumes
     */
    getAlbumes() {
        return this.albumes_;
    }
    /**
     *
     * @returns oyentes
     */
    getOyentes() {
        return this.oyentesMensuales_;
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
     * @param componentes componentes
     */
    setComponentes(componentes) {
        this.componentes_ = componentes;
    }
    /**
     *
     * @param añocreacion año
     */
    setAñoCreacion(añocreacion) {
        this.añoCreacion_ = añocreacion;
    }
    /**
     *
     * @param generos generos
     */
    setGeneros(generos) {
        this.generos_ = generos;
    }
    /**
     *
     * @param albumes albumes
     */
    setAlbumes(albumes) {
        this.albumes_ = albumes;
    }
    /**
     *
     * @param oyentes oyentes
     */
    setOyentes(oyentes) {
        this.oyentesMensuales_ = oyentes;
    }
    /**
     * Muestra la informacion de un grupo
     */
    printData() {
        console.log(this.nombre_);
        console.log('Componentes:');
        this.componentes_.forEach((c) => {
            console.log('   ', c);
        });
        console.log('Generos:');
        this.generos_.forEach((g) => {
            console.log('   ', g);
        });
        console.log('Albumes:');
        this.albumes_.forEach((a) => {
            console.log('   ', a);
        });
        console.log('Oyentes mensuales: ', this.oyentesMensuales_);
    }
}
exports.Grupo = Grupo;
/**
   * Clase que representa un colección de grupos y permite acceder a la base de datos y administrar grupos
   */
class JsonGrupoCollection {
    /**
       * Constructor que lee un archivo .json donde se encuentran la grupos y las introduce en un array como objetos Grupo
       * @param coleccion Coleccion de grupos
       */
    constructor(coleccion) {
        this.coleccion = coleccion;
        this.database = (0, lowdb_1.default)(new FileSync_1.default("dataBase/db_grupos.json"));
        if (this.database.has("grupos").value()) {
            let dbItems = this.database.get("grupos").value();
            dbItems.forEach(item => this.coleccion.push(new Grupo(item.nombre, item.componentes, item.año, item.generos, item.albumes, item.oyentes)));
        }
        this.displayMod = this.coleccion;
    }
    /**
     * Añade un grupo
     * @param n nombre
     * @param c componentes
     * @param a autores
     * @param g generos
     * @param alb albumes
     * @param o oyentes
     */
    addGrupo(n, c, a, g, alb, o) {
        this.coleccion.push(new Grupo(n, c, a, g, alb, o));
        this.database.get("grupos").push({ nombre: n, componentes: c, año: a, generos: g, albumes: alb, oyentes: o }).write();
    }
    /**
     * Elimina un grupo a la coleccion y a la base de datos
     * @param n nombre
     */
    deleteGrupo(n) {
        this.database.get("grupos").remove({ nombre: n }).write();
        this.coleccion = this.coleccion.filter(element => {
            element.getNombre() !== n;
        });
    }
    /**
     * Elimina varios grupos
     * @param gs grupos
     */
    deleteGrupoVector(gs) {
        gs.forEach(e => {
            this.database.get("grupos").remove({ nombre: e }).write();
            this.coleccion = this.coleccion.filter(buenas => {
                buenas.getNombre() !== e;
            });
        });
    }
    /**
     *
     * @param n indice del grupo
     * @returns grupo
     */
    getGrupo(n) {
        return this.coleccion[n];
    }
    /**
     *
     * @param n nombre
     * @returns se encuentra o no
     */
    includesGrupo(n) {
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
     * @returns grupo coincidente
     */
    getGrupoByName(n) {
        return this.coleccion.find((element) => {
            element.getNombre() === n;
        });
    }
    /**
     * Muestra los grupos
     */
    displayGrupos() {
        console.log('──────────────────────────');
        this.coleccion.forEach((grupo) => {
            grupo.printData();
            console.log('──────────────────────────');
        });
    }
}
exports.JsonGrupoCollection = JsonGrupoCollection;
