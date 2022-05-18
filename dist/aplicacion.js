"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Aplicacion = void 0;
const chalk_1 = __importDefault(require("chalk"));
const fs_1 = require("fs");
/**
 * Tipo de datos para representar las notas
 */
let n;
let file;
class Aplicacion {
    constructor() {
        this.result = true;
    }
    /**
     * Funcion que añade una nota
     * @param usuario usuario
     * @param titulo titulo
     * @param data datos
     * @param color color
     */
    add(usuario, titulo, data, color) {
        if (typeof usuario === 'string') {
            this.createDir(usuario);
        }
        (0, fs_1.readFile)('notas/' + usuario + '/notas.txt', (_, d) => {
            if ((typeof titulo === 'string') && (typeof data === 'string') && (typeof usuario === 'string') && (typeof color === 'string')) {
                let is_in;
                is_in = false;
                if (!file) {
                    n = JSON.parse(d.toString());
                    n.notas.forEach((element) => { if (element.titulo == titulo) {
                        is_in = true;
                    } });
                    if (is_in) {
                        console.log(chalk_1.default.red('Nota existente'));
                        this.result = false;
                    }
                    else {
                        n.notas.push({ usuario: usuario, titulo: titulo, data: data, color: color });
                        console.log(chalk_1.default.green('Nueva nota añadida'));
                        this.result = true;
                        try {
                            (0, fs_1.writeFileSync)('notas/' + usuario + '/notas.txt', JSON.stringify(n));
                            console.log(chalk_1.default.green('La información ha sido añadida correctamente'));
                        }
                        catch (err) {
                            console.log(chalk_1.default.red('Se ha producido un error'));
                        }
                    }
                }
                else {
                    n = { notas: [{ usuario: '', titulo: '', data: '', color: '' }] };
                    n.notas[0].usuario = usuario;
                    n.notas[0].titulo = titulo;
                    n.notas[0].data = data;
                    n.notas[0].color = color;
                    console.log(chalk_1.default.green('Nueva nota añadida'));
                    this.result = true;
                    try {
                        (0, fs_1.writeFileSync)('notas/' + usuario + '/notas.txt', JSON.stringify(n));
                        console.log(chalk_1.default.green('La información ha sido añadida correctamente'));
                    }
                    catch (err) {
                        console.log(chalk_1.default.red('Se ha producido un error'));
                    }
                }
            }
        });
        return this.result;
    }
    /**
     * Funcion que elimina una nota
     * @param usuario ususario
     * @param titulo titulo
     */
    del(usuario, titulo) {
        if (typeof usuario === 'string') {
            this.createDir(usuario);
        }
        if (file) {
            console.log(chalk_1.default.red('Se trata de un archivo nuevo'));
        }
        else {
            (0, fs_1.readFile)('notas/' + usuario + '/notas.txt', (_, d) => {
                if ((typeof titulo === 'string') && (typeof usuario === 'string')) {
                    let is_in;
                    is_in = false;
                    n = JSON.parse(d.toString());
                    n.notas.forEach((element, i) => { if (element.titulo == titulo) {
                        is_in = true, n.notas.splice(i, 1);
                        console.log(chalk_1.default.green('Borrada correctamente'));
                    } });
                    if (!is_in) {
                        console.log(chalk_1.default.red('La nota no existe'));
                    }
                    try {
                        (0, fs_1.writeFileSync)('notas/' + usuario + '/notas.txt', JSON.stringify(n));
                    }
                    catch (err) {
                        console.log(chalk_1.default.red('Se ha producido un error'));
                    }
                }
            });
        }
    }
    /**
     * Fucnion que modifica una nota
     * @param usuario usuario
     * @param titulo titulo
     * @param data datos
     * @param color color
     */
    mod(usuario, titulo, data, color) {
        if (typeof usuario === 'string') {
            this.createDir(usuario);
        }
        if (file) {
            console.log(chalk_1.default.red('Se trata de un archivo nuevo'));
        }
        else {
            (0, fs_1.readFile)('notas/' + usuario + '/notas.txt', (_, d) => {
                if ((typeof titulo === 'string') && (typeof data === 'string') && (typeof usuario === 'string') && (typeof color === 'string')) {
                    let is_in;
                    is_in = false;
                    n = JSON.parse(d.toString());
                    n.notas.forEach((element) => {
                        if (element.titulo == titulo) {
                            is_in = true;
                            if ((typeof color === 'string') && (typeof data === 'string')) {
                                element.data = data;
                                element.color = color;
                                console.log(chalk_1.default.green('Modificado correctamente'));
                            }
                        }
                    });
                    if (!is_in) {
                        console.log(chalk_1.default.red('Nota no existente'));
                    }
                    try {
                        (0, fs_1.writeFileSync)('notas/' + usuario + '/notas.txt', JSON.stringify(n));
                        console.log(chalk_1.default.green('La información ha sido añadida correctamente'));
                    }
                    catch (err) {
                        console.log(chalk_1.default.red('Se ha producido un error'));
                    }
                }
            });
        }
    }
    /**
     * Funcion que lista las notas de un usuario
     * @param usuario usuario
     */
    list(usuario) {
        if (typeof usuario === 'string') {
            this.createDir(usuario);
        }
        if (file) {
            console.log(chalk_1.default.red('Se trata de un archivo nuevo'));
        }
        else {
            (0, fs_1.readFile)('notas/' + usuario + '/notas.txt', (_, data) => {
                if ((typeof usuario === 'string')) {
                    n = JSON.parse(data.toString());
                    n.notas.forEach((element) => this.printColor(element.color, element.titulo));
                }
            });
        }
    }
    /**
     * Funcion que muestra el contenido de una nota
     * @param usuario usuario
     * @param titulo titulo
     */
    read(usuario, titulo) {
        if (typeof usuario === 'string') {
            this.createDir(usuario);
        }
        if (file) {
            console.log(chalk_1.default.red('Se trata de un archivo nuevo'));
        }
        else {
            (0, fs_1.readFile)('notas/' + usuario + '/notas.txt', (_, data) => {
                if ((typeof titulo === 'string') && (typeof usuario === 'string')) {
                    let is_in;
                    is_in = false;
                    n = JSON.parse(data.toString());
                    n.notas.forEach((element) => { if (element.titulo == titulo) {
                        is_in = true;
                        this.printColor(element.color, element.titulo + ': ' + element.data);
                    } });
                    if (!is_in) {
                        console.log(chalk_1.default.red('Nota no existente'));
                    }
                }
            });
        }
    }
    /**
     * Funcion que crea un directorio
     * @param u nombre del usuario
     */
    createDir(u) {
        if ((0, fs_1.existsSync)('notas/' + u)) {
            console.log(chalk_1.default.green('Existe el directorio'));
            file = false;
        }
        else {
            (0, fs_1.mkdirSync)('notas/' + u);
            (0, fs_1.openSync)('notas/' + u + '/notas.txt', 'w');
            file = true;
        }
    }
    /**
     * Funcion que muestra un texto en un color
     * @param c color
     * @param data texto
     */
    printColor(c, data) {
        switch (c) {
            case ('rojo'):
                console.log(chalk_1.default.red(data));
                break;
            case ('azul'):
                console.log(chalk_1.default.blue(data));
                break;
            case ('verde'):
                console.log(chalk_1.default.green(data));
                break;
            case ('amarillo'):
                console.log(chalk_1.default.yellow(data));
                break;
            default:
                console.log(chalk_1.default.gray(data));
                break;
        }
    }
}
exports.Aplicacion = Aplicacion;
