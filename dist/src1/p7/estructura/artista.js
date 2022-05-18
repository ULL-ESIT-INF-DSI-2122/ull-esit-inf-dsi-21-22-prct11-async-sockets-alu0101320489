"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonArtistaCollection = exports.Artista = void 0;
const lowdb_1 = __importDefault(require("lowdb"));
const FileSync_1 = __importDefault(require("lowdb/adapters/FileSync"));
const cancion_1 = require("./cancion");
const grupo_1 = require("./grupo");
/**
 * Clase que representa un artista
 */
class Artista {
    /**
     * Constructor de clase que calcula el atributo de oyentes sumando los oyentes de sus canciones indeivudales y grupales
     * @param nombre_
     * @param grupos_
     * @param generos_
     * @param albumes_
     * @param canciones_
     */
    constructor(nombre_, grupos_, generos_, albumes_, canciones_) {
        this.nombre_ = nombre_;
        this.grupos_ = grupos_;
        this.generos_ = generos_;
        this.albumes_ = albumes_;
        this.canciones_ = canciones_;
        let oyentesInd = 0;
        let oyentesGrup = 0;
        let colCanciones = new cancion_1.JsonCancionCollection([]);
        let colGrupos = new grupo_1.JsonGrupoCollection([]);
        this.canciones_.forEach((cancion) => {
            if (colCanciones.includesCancion(cancion)) {
                this.grupos_.forEach((grupo) => {
                    if (colGrupos.includesGrupo(grupo)) {
                        if (colCanciones.getCancionByName(cancion).getAutor() == colGrupos.getGrupoByName(grupo).getNombre()) {
                            oyentesInd = oyentesInd + colCanciones.getCancionByName(cancion).getReproducciones();
                        }
                    }
                });
            }
        });
        this.grupos_.forEach((grupo) => {
            if (colGrupos.includesGrupo(grupo)) {
                oyentesGrup = oyentesGrup + colGrupos.getGrupoByName(grupo).getOyentes();
            }
        });
        this.oyentesMensuales_ = oyentesInd + oyentesGrup;
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
     * @returns grupos
     */
    getGrupos() {
        return this.grupos_;
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
     * @returns canciones
     */
    getCanciones() {
        return this.canciones_;
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
     * @param grupos grupos
     */
    setGrupos(grupos) {
        this.grupos_ = grupos;
    } /**
       *
       * @param generos generos
       */
    setGeneros(generos) {
        this.generos_ = generos;
    } /**
       *
       * @param albumes albumes
       */
    setAlbumes(albumes) {
        this.albumes_ = albumes;
    }
    /**
     *
     * @param canciones canciones
     */
    setCanciones(canciones) {
        this.canciones_ = canciones;
    }
    /**
     *
     * @param oyentes oyentes
     */
    setOyentes(oyentes) {
        this.oyentesMensuales_ = oyentes;
    }
    /**
     * muestra la informacion de la clase
     */
    printData() {
        console.log(this.nombre_);
        console.log('Grupos:');
        this.grupos_.forEach((g) => {
            console.log('   ', g);
        });
        console.log('Generos:');
        this.generos_.forEach((g) => {
            console.log('   ', g);
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
exports.Artista = Artista;
/**
 * Clase que representa un colección de artistas y permite acceder a la base de datos y administrar artistas
 */
class JsonArtistaCollection {
    constructor(coleccion) {
        this.coleccion = coleccion;
        /**
       * Constructor que lee un archivo .json donde se encuentran los artistas y las introduce en un array como objetos Artista
       * @param coleccion Coleccion de artistas
       */
        this.database = (0, lowdb_1.default)(new FileSync_1.default("dataBase/db_artistas.json"));
        if (this.database.has("artistas").value()) {
            let dbItems = this.database.get("artistas").value();
            dbItems.forEach(item => this.coleccion.push(new Artista(item.nombre, item.grupos, item.generos, item.albumes, item.canciones)));
        }
        this.displayMod = this.coleccion;
    }
    /**
     * Añade un artista
     * @param n nombre
     * @param g grupos
     * @param gen generos
     * @param alb albumes
     * @param c canciones
     */
    addArtista(n, g, gen, alb, c) {
        this.coleccion.push(new Artista(n, g, gen, alb, c));
        this.database.get("artistas").push({ nombre: n, grupos: g, generos: g, albumes: alb, canciones: c }).write();
    }
    /**
     * Elimina un artista
     * @param n nombre
     */
    deleteArtista(n) {
        this.database.get("artistas").remove({ nombre: n }).write();
        this.coleccion = this.coleccion.filter(element => { element.getNombre() !== n; });
    }
    /**
     * Elimina varios artistas
     * @param gs artistas
     */
    deleteArtistaVector(gs) {
        gs.forEach(e => {
            this.database.get("artistas").remove({ nombre: e }).write();
            this.coleccion = this.coleccion.filter(buenas => { buenas.getNombre() !== e; });
        });
    }
    /**
     *
     * @param n indice
     * @returns artista
     */
    getArtista(n) {
        return this.coleccion[n];
    }
    /**
     *
     * @param n nombre
     * @returns existe o no
     */
    includesArtista(n) {
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
     * @returns artista coindicente
     */
    getArtistaByName(n) {
        return this.coleccion.find((element) => {
            element.getNombre() === n;
        });
    }
    /**
     * Muestra la informacion de los artistas
     */
    displayOrdenedArtistas() {
        console.log('──────────────────────────');
        this.displayMod.forEach((artista) => {
            artista.printData();
            console.log('──────────────────────────');
        });
    }
}
exports.JsonArtistaCollection = JsonArtistaCollection;
