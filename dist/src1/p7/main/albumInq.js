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
exports.promptUser = exports.promptList = exports.promptOrd = exports.promptAdd = exports.promptMod = exports.promptDelete = void 0;
const inquirer = __importStar(require("inquirer"));
const alb = __importStar(require("../estructura/album"));
let scanf = require('scanf');
const index_1 = require("./index");
const albCol = new alb.JsonAlbumCollection([]);
let asc = false; // Determina si se ordena ascendente o descendentemente
function promptDelete() {
    console.clear();
    inquirer.prompt({
        type: "checkbox", name: "DelAlbEx",
        message: "Seleccione las canciones que quiera borrar: ",
        choices: albCol.coleccion.map(e => e.getNombre())
    })
        .then(answers => {
        let borradas = answers["DelAlbEx"];
        albCol.deleteAlbumVector(borradas);
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
    inquirer.prompt({ type: "list", name: "ModAlb", message: "Modificar Canciones:",
        choices: Object.values(CMod) })
        .then(answers => {
        switch (answers["ModAlb"]) {
            case CMod.Mod:
                process.stdout.write('Nombre> ');
                const n = scanf('%s');
                if (albCol.includesAlbum(n)) {
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
                    albCol.deleteAlbum(n);
                    albCol.addAlbum(n, a, d, g, c);
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
                if (!albCol.includesAlbum(n)) {
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
                    albCol.addAlbum(n, a, d, g, c);
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
function promptOrd() {
    let COrd;
    (function (COrd) {
        COrd["Nom"] = "Nombre";
        COrd["Ano"] = "A\u00F1o de lanzamiento";
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
                albCol.ordAlfabeticoTitulo(asc);
                break;
            case COrd.Ano:
                albCol.ordAño(asc);
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
    albCol.displayOrdenedGeneros();
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
        Comandos["Add"] = "A\u00F1adir album";
        Comandos["List"] = "Listar album";
        Comandos["Delete"] = "Borrar album";
        Comandos["Mod"] = "Modificar album";
        Comandos["Purge"] = "Borrar albumes";
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
