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
exports.promptUser = exports.promptList = exports.promptSeleccionar = exports.promptManagePlaylist = exports.promptListCanciones = exports.promptOrd = exports.promptListPlaylist = exports.promptDeleteCanciones = exports.promptAddCanciones = exports.promptAdd = exports.promptMod = exports.promptDelete = void 0;
const inquirer = __importStar(require("inquirer"));
let scanf = require('scanf');
const index_1 = require("./index");
const gestor_1 = require("../estructura/gestor");
const gestor = new gestor_1.Gestor();
let asc = false; // Determina si se ordena ascendente o descendentemente
function promptDelete() {
    console.clear();
    inquirer.prompt({
        type: "checkbox", name: "Del",
        message: "Seleccione las canciones que quiera borrar: ",
        choices: gestor.coleccion.map(e => e.getNombre())
    })
        .then(answers => {
        let borradas = answers["Del"];
        gestor.deletePlayListVector(borradas);
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
    inquirer.prompt({ type: "list", name: "Mod", message: "Modificar Playlist:",
        choices: Object.values(CMod) })
        .then(answers => {
        switch (answers["Mod"]) {
            case CMod.Mod:
                process.stdout.write('Nombre> ');
                const n = scanf('%s');
                if (gestor.includesPlayList(n)) {
                    process.stdout.write('Autor> ');
                    const a = scanf('%s');
                    process.stdout.write('Generos separados por ","> ');
                    const b = scanf('%s');
                    const g = b.split(',');
                    process.stdout.write('Canciones separadas por ","> ');
                    const e = scanf('%s');
                    const c = e.split(',');
                    gestor.deletePlayList(n, "sistema");
                    // Hay que calcular la duracion segun sus canciones
                    // plaCol.addPlayList(n, a, d, g, c);
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
                if (!gestor.includesPlayList(n)) {
                    process.stdout.write('Autor> ');
                    const a = scanf('%s');
                    process.stdout.write('Año de publicacion> ');
                    const d = scanf('%d');
                    process.stdout.write('Generos separados por ","> ');
                    const b = scanf('%s');
                    const g = b.split(',');
                    process.stdout.write('Canciones separadas por ","> ');
                    const e = scanf('%s');
                    const c = e.split(',');
                    // plaCol.addPlayList(n, a, d, g, c);
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
function promptAddCanciones() {
    let CAdd;
    (function (CAdd) {
        CAdd["Nueva"] = "A\u00F1adir un Album nuevo";
        CAdd["Existente"] = "A\u00F1adir una cancion existente";
        CAdd["Quit"] = "Salir";
    })(CAdd || (CAdd = {}));
    console.clear();
    inquirer.prompt({ type: "list", name: "Add", message: "Añadir Album:",
        choices: Object.values(CAdd) })
        .then(answers => {
        switch (answers["Add"]) {
            case CAdd.Nueva:
                process.stdout.write('Nombre> ');
                const n = scanf('%s');
                gestor.addSongToActualPlaylist(n);
                promptUser();
                break;
            case CAdd.Existente:
                inquirer.prompt({ type: "checkbox", name: "selCan", message: "Cancion a añadir:",
                    choices: gestor.getTodasCanciones().map(e => e.getNombre()) })
                    .then(answers => {
                    gestor.addSongVectorToActualPlaylist(answers["selCan"]);
                });
                promptListCanciones();
                break;
            case CAdd.Quit:
                promptListCanciones();
                break;
        }
    });
}
exports.promptAddCanciones = promptAddCanciones;
function promptDeleteCanciones() {
    let CAdd;
    (function (CAdd) {
        CAdd["delete"] = "Borrar una cancion";
        CAdd["Quit"] = "Salir";
    })(CAdd || (CAdd = {}));
    console.clear();
    inquirer.prompt({ type: "list", name: "Add", message: "Seleccione las canciones a borrar:",
        choices: Object.values(CAdd) })
        .then(answers => {
        switch (answers["Add"]) {
            case CAdd.delete:
                inquirer.prompt({ type: "checkbox", name: "selCan", message: "Cancion a añadir:",
                    choices: gestor.getActualSongs() })
                    .then(answers => {
                    gestor.deleteSongVectorFromActualPlaylist(answers["selCan"]);
                });
                promptListCanciones();
                break;
            case CAdd.Quit:
                promptListCanciones();
                break;
        }
    });
}
exports.promptDeleteCanciones = promptDeleteCanciones;
function promptListPlaylist() {
    let CList;
    (function (CList) {
        CList["Ordenar"] = "Ordenar";
        CList["Quit"] = "Salir";
    })(CList || (CList = {}));
    console.clear();
    gestor.displayOrdenedPlayList();
    inquirer.prompt({
        type: "list",
        name: "comand",
        message: "Teclee para continuar",
        choices: Object.values(CList),
    }).then(answers => {
        switch (answers["comand"]) {
            case CList.Ordenar:
                promptOrd();
                break;
            case CList.Quit:
                promptUser();
                break;
        }
    });
}
exports.promptListPlaylist = promptListPlaylist;
function promptOrd() {
    let COrd;
    (function (COrd) {
        COrd["Nom"] = "Nombre";
        COrd["Dur"] = "Duracion";
        COrd["Quit"] = "Salir";
    })(COrd || (COrd = {}));
    console.clear();
    inquirer.prompt({
        type: "list",
        name: "comand",
        message: "Teclee para continuar",
        choices: Object.values(COrd),
    }).then(answers => {
        asc = !asc;
        switch (answers["comand"]) {
            case COrd.Nom:
                promptList();
                gestor.ordAlfabeticoTitulo(asc);
                break;
            case COrd.Dur:
                gestor.ordDuracion(asc);
                promptList();
                break;
            case COrd.Quit:
                promptUser();
                break;
        }
    });
}
exports.promptOrd = promptOrd;
// No hace nada
function promptListCanciones() {
    let CList;
    (function (CList) {
        CList["Quit"] = "Salir";
    })(CList || (CList = {}));
    console.clear();
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
exports.promptListCanciones = promptListCanciones;
function promptManagePlaylist() {
    let Comandos;
    (function (Comandos) {
        Comandos["Add"] = "A\u00F1adir Cancion";
        Comandos["List"] = "Listar Canciones";
        Comandos["Delete"] = "Borrer canciones";
        Comandos["Quit"] = "Quit";
    })(Comandos || (Comandos = {}));
    console.clear();
    gestor.displayPlaylistSongs();
    inquirer.prompt({
        type: "list",
        name: "command",
        message: "Elija una opcion:",
        choices: Object.values(Comandos),
    }).then((answers) => {
        switch (answers["command"]) {
            case Comandos.List:
                promptListCanciones();
                break;
            case Comandos.Add:
                promptAddCanciones();
                break;
            case Comandos.Delete:
                promptDeleteCanciones();
                break;
            case Comandos.Quit:
                (0, index_1.mainPrompt)();
                break;
        }
    });
}
exports.promptManagePlaylist = promptManagePlaylist;
function promptSeleccionar() {
    console.clear();
    inquirer.prompt({
        type: "checkbox", name: "sel",
        message: "Seleccione la playlist: ",
        choices: gestor.coleccion.map(e => e.getNombre())
    })
        .then(answers => {
        gestor.setSelectedPlaylist(answers["sel"][0]);
        promptManagePlaylist();
    });
}
exports.promptSeleccionar = promptSeleccionar;
function promptList() {
    let CList;
    (function (CList) {
        CList["Ordenar"] = "Ordenar";
        CList["Seleccionar"] = "Seleccionar";
        CList["Quit"] = "Salir";
    })(CList || (CList = {}));
    console.clear();
    gestor.displayOrdenedPlayList();
    inquirer.prompt({
        type: "list",
        name: "comand",
        message: "Teclee para continuar",
        choices: Object.values(CList),
    }).then(answers => {
        switch (answers["comand"]) {
            case CList.Ordenar:
                promptOrd();
                break;
            case CList.Seleccionar:
                promptSeleccionar();
                break;
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
        Comandos["Add"] = "A\u00F1adir Playlist";
        Comandos["List"] = "Listar Playlists";
        Comandos["Delete"] = "Borrer Playlist";
        Comandos["Mod"] = "Modificar Playlist";
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
            case Comandos.List:
                promptList();
                break;
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
            case Comandos.Quit:
                (0, index_1.mainPrompt)();
                break;
        }
    });
}
exports.promptUser = promptUser;
