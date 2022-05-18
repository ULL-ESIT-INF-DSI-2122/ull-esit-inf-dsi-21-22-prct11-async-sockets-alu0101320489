"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonPlayListCollection = exports.PlayList = void 0;
const lowdb_1 = __importDefault(require("lowdb"));
const FileSync_1 = __importDefault(require("lowdb/adapters/FileSync"));
const can = __importStar(require("./cancion"));
/**
 * Clase que representa un playlist
 */
class PlayList {
    /**
     *
     * @param nombre_ nombre
     * @param autor_ autor
     * @param canciones_ canciones
     * @param duracion_ duracion
     * @param generos_ generos
     */
    constructor(nombre_, autor_, canciones_, duracion_, generos_) {
        this.nombre_ = nombre_;
        this.autor_ = autor_;
        this.canciones_ = canciones_;
        this.duracion_ = duracion_;
        this.generos_ = generos_;
        this.dbCanciones = new can.JsonCancionCollection([]);
        this.duracion_ = this.obtainDuracionFromCancion();
    }
    /**
     *
     * @returns duracion de la playlist a partir de la de las canciones
     */
    obtainDuracionFromCancion() {
        let mins = 0;
        let secs = 0;
        let v = [];
        this.canciones_.forEach(c => {
            v = this.dbCanciones.getCancionByName(c).getDuracion().split(':');
            mins += parseInt(v[0]);
            secs += parseInt(v[1]);
        });
        mins += Math.floor(secs / 60);
        secs %= 60;
        return mins + ':' + ((secs < 10) ? "0" + secs : secs);
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
     * @returns canciones
     */
    getCanciones() {
        return this.canciones_;
    }
    /**
     *
     * @returns duracion
     */
    getDuracion() {
        return this.duracion_;
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
     * @returns autor
     */
    getAutor() {
        return this.autor_;
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
     * @param canciones canciones
     */
    setCanciones(canciones) {
        this.canciones_ = canciones;
    }
    /**
     *
     * @param duracion duracion
     */
    setDuracion(duracion) {
        this.duracion_ = duracion;
    }
    /**
     *
     * @param genero generos
     */
    setGeneros(genero) {
        this.generos_ = genero;
    }
    /**
     * Muestra la informacion de un playlist
     */
    printData() {
        console.log(this.nombre_);
        console.log('Autor: ', this.autor_);
        console.log('Canciones:');
        this.canciones_.forEach((c) => {
            console.log('   ', c);
        });
        console.log('Duracion: ', this.duracion_);
        console.log('Generos:');
        this.generos_.forEach((g) => {
            console.log('   ', g);
        });
    }
}
exports.PlayList = PlayList;
/**
 * Clase que representa un colección de playlist y permite acceder a la base de datos y administrar Playlist
 */
class JsonPlayListCollection {
    /**
     * Constructor que lee un archivo .json donde se encuentran la playlists y las introduce en un array como objetos PLaylist
     * @param coleccion Coleccion de playlists
     */
    constructor(coleccion) {
        this.coleccion = coleccion;
        this.database = (0, lowdb_1.default)(new FileSync_1.default("dataBase/db_playlists.json"));
        if (this.database.has("playlists").value()) {
            let dbItems = this.database.get("playlists").value();
            dbItems.forEach(item => this.coleccion.push(new PlayList(item.nombre, item.autor, item.canciones, item.duracion, item.generos)));
        }
        this.displayMod = this.coleccion;
    }
    /**
     *
     * @returns coleccion
     */
    getCollection() {
        return this.coleccion;
    }
    /**
     *
     * @param n indice
     * @returns playlist
     */
    getPlayList(n) {
        return this.coleccion[n];
    }
    /**
     *
     * @param n nombre
     * @returns playlist coincidente
     */
    getPlayListByName(n) {
        return this.coleccion.find(e => e.getNombre() === n);
    }
    /**
     *
     * @param n nombre
     * @returns existe o no
     */
    includesPlayList(n) {
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
     * @param asc ascendente o descendente
     * @returns ordenadas alfabeticamente
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
     * @returns ordenadas por duracion
     */
    ordDuracion(asc) {
        this.displayMod = this.coleccion;
        if (asc) {
            this.displayMod.sort((a, b) => a.getDuracion().localeCompare(b.getDuracion()));
        }
        else {
            this.displayMod.sort((a, b) => b.getDuracion().localeCompare(a.getDuracion()));
        }
        return this.displayMod;
    }
    /**
     *
     * @param asc ascendente o descendente
     * @returns ordenadas por reproducciones
     */
    ordReproduccionesPlaylist(asc, n) {
        if (asc) {
            this.coleccion[n][1].sort((a, b) => a.getReproducciones() - b.getReproducciones());
        }
        else {
            this.coleccion[n][1].sort((a, b) => b.getReproducciones() - a.getReproducciones());
        }
    }
    /**
     * Muestra informacion de las playlists
     */
    displayOrdenedPlayList() {
        console.log('──────────────────────────');
        this.displayMod.forEach((album) => {
            album.printData();
            console.log('──────────────────────────');
        });
    }
}
exports.JsonPlayListCollection = JsonPlayListCollection;
