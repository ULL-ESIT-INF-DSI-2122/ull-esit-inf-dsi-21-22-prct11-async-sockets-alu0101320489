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
exports.promptUser = exports.promptList = exports.promptOrd = void 0;
const inquirer = __importStar(require("inquirer"));
const pla = __importStar(require("../estructura/playlist"));
let scanf = require('scanf');
const index_1 = require("./index");
const plaCol = new pla.JsonPlayListCollection([]);
let asc = false; // Determina si se ordena ascendente o descendentemente
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
                plaCol.ordAlfabeticoTitulo(asc);
                break;
            case COrd.Dur:
                plaCol.ordDuracion(asc);
                promptList();
                break;
            case COrd.Quit:
                promptUser();
                break;
        }
    });
}
exports.promptOrd = promptOrd;
function promptList() {
    let CList;
    (function (CList) {
        CList["Ordenar"] = "Ordenar";
        CList["Quit"] = "Salir";
    })(CList || (CList = {}));
    console.clear();
    plaCol.displayOrdenedPlayList();
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
exports.promptList = promptList;
function promptUser() {
    let Comandos;
    (function (Comandos) {
        Comandos["List"] = "Listar album";
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
            case Comandos.Quit:
                (0, index_1.mainPrompt)();
                break;
        }
    });
}
exports.promptUser = promptUser;
