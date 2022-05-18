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
Object.defineProperty(exports, "__esModule", { value: true });
exports.promptUser = exports.promptList = exports.promptAdd = exports.promptMod = exports.promptDelete = void 0;
const inquirer = __importStar(require("inquirer"));
const art = __importStar(require("../estructura/artista"));
let scanf = require('scanf');
const index_1 = require("./index");
const artCol = new art.JsonArtistaCollection([]);
let asc = false; // Determina si se ordena ascendente o descendentemente
function promptDelete() {
    console.clear();
    inquirer.prompt({
        type: "checkbox", name: "DelArtEx",
        message: "Seleccione las canciones que quiera borrar: ",
        choices: artCol.coleccion.map(e => e.getNombre())
    })
        .then(answers => {
        let borradas = answers["DelArtEx"];
        artCol.deleteArtistaVector(borradas);
        promptUser();
    });
}
exports.promptDelete = promptDelete;
function promptMod() {
    let CMod;
    (function (CMod) {
        CMod["Mod"] = "Modificar";
        CMod["Quit"] = "Salir";
    })(CMod || (CMod = {}));
    console.clear();
    inquirer.prompt({ type: "list", name: "ModArt", message: "Modificar Canciones:",
        choices: Object.values(CMod) })
        .then(answers => {
        switch (answers["ModArt"]) {
            case CMod.Mod:
                process.stdout.write('Nombre> ');
                const n = scanf('%s');
                if (artCol.includesArtista(n)) {
                    process.stdout.write('Grupos separados por ","> ');
                    const a = scanf('%s');
                    const gr = a.split(',');
                    process.stdout.write('Albumes separados por ","> ');
                    const aux = scanf('%s');
                    const al = aux.split(',');
                    process.stdout.write('Generos separados por ","> ');
                    const b = scanf('%s');
                    const g = b.split(',');
                    process.stdout.write('Canciones separadas por ","> ');
                    const e = scanf('%s');
                    const c = e.split(',');
                    artCol.deleteArtista(n);
                    artCol.addArtista(n, gr, g, al, c);
                }
                else {
                    console.log(n, ' no esta guardada.');
                    console.log('Pulse cualquier tecla para continuar.');
                    scanf('%s');
                }
                promptUser();
                break;
            case CMod.Quit:
                promptUser();
                break;
        }
    });
}
exports.promptMod = promptMod;
function promptAdd() {
    let CAdd;
    (function (CAdd) {
        CAdd["Nueva"] = "A\u00F1adir un Album nuevo";
        CAdd["Quit"] = "Salir";
    })(CAdd || (CAdd = {}));
    console.clear();
    inquirer.prompt({ type: "list", name: "AddAlbum", message: "Añadir Album:",
        choices: Object.values(CAdd) })
        .then(answers => {
        switch (answers["AddAlbum"]) {
            case CAdd.Nueva:
                process.stdout.write('Nombre> ');
                const n = scanf('%s');
                if (!artCol.includesArtista(n)) {
                    process.stdout.write('Grupos separados por ","> ');
                    const a = scanf('%s');
                    const gr = a.split(',');
                    process.stdout.write('Albumes separados por ","> ');
                    const aux = scanf('%s');
                    const al = aux.split(',');
                    process.stdout.write('Generos separados por ","> ');
                    const b = scanf('%s');
                    const g = b.split(',');
                    process.stdout.write('Canciones separadas por ","> ');
                    const e = scanf('%s');
                    const c = e.split(',');
                    artCol.addArtista(n, gr, g, al, c);
                }
                else {
                    console.log(n, ' ya esta registrada.');
                    console.log('Pulse cualquier tecla para continuar.');
                    scanf('%s');
                }
                promptUser();
                break;
            case CAdd.Quit:
                promptUser();
                break;
        }
    });
}
exports.promptAdd = promptAdd;
function promptList() {
    let CList;
    (function (CList) {
        CList["Quit"] = "Salir";
    })(CList || (CList = {}));
    console.clear();
    artCol.displayOrdenedArtistas();
    inquirer.prompt({
        type: "list",
        name: "comand",
        message: "Teclee para continuar",
        choices: Object.values(CList),
    }).then(answers => {
        switch (answers["comand"]) {
            case CList.Quit:
                promptUser();
                break;
        }
    });
}
exports.promptList = promptList;
function promptUser() {
    let Comandos;
    (function (Comandos) {
        Comandos["Add"] = "A\u00F1adir artista";
        Comandos["List"] = "Listar artista";
        Comandos["Delete"] = "Borrar artista";
        Comandos["Mod"] = "Modificar artista";
        Comandos["Purge"] = "Borrar artistas";
        Comandos["Quit"] = "Quit";
    })(Comandos || (Comandos = {}));
    console.clear();
    inquirer.prompt({
        type: "list",
        name: "command",
        message: "Elija una opcion:",
        choices: Object.values(Comandos),
    }).then((answers) => {
        switch (answers["command"]) {
            case Comandos.Add:
                promptAdd();
                break;
            case Comandos.Delete:
                promptDelete();
                break;
            case Comandos.List:
                promptList();
                break;
            case Comandos.Mod:
                promptMod();
                break;
            case Comandos.Purge:
                promptUser();
                break;
            case Comandos.Quit:
                (0, index_1.mainPrompt)();
                break;
        }
    });
}
exports.promptUser = promptUser;
