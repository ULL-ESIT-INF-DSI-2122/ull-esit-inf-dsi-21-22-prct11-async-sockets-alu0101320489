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
const gru = __importStar(require("../estructura/grupo"));
let scanf = require('scanf');
const index_1 = require("./index");
const gruCol = new gru.JsonGrupoCollection([]);
let onlySingles = false; // Al principio se muestran todos
function promptDelete() {
    console.clear();
    inquirer.prompt({
        type: "checkbox", name: "DelgruEx",
        message: "Seleccione las canciones que quiera borrar: ",
        choices: gruCol.coleccion.map(e => e.getNombre())
    })
        .then(answers => {
        let borradas = answers["DelgruEx"];
        gruCol.deleteGrupoVector(borradas);
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
    inquirer.prompt({ type: "list", name: "Modgru", message: "Modificar Canciones:",
        choices: Object.values(CMod) })
        .then(answers => {
        switch (answers["ModGru"]) {
            case CMod.Mod:
                process.stdout.write('Nombre> ');
                const n = scanf('%s');
                if (gruCol.includesGrupo(n)) {
                    process.stdout.write('Nombre> ');
                    const n = scanf('%s');
                    process.stdout.write('Componentes separados por ","> ');
                    const a = scanf('%s');
                    const c = a.split(',');
                    process.stdout.write('Año de creacion> ');
                    const d = scanf('%s');
                    process.stdout.write('Generos separados por ","> ');
                    const b = scanf('%s');
                    const g = b.split(',');
                    process.stdout.write('Albumes separados por ","> ');
                    const e = scanf('%s');
                    const al = e.split(',');
                    process.stdout.write('Oyentes mensuales> ');
                    const o = scanf('%d');
                    gruCol.deleteGrupo(n);
                    gruCol.addGrupo(n, c, d, g, al, o);
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
        CAdd["Nueva"] = "A\u00F1adir un grupo nuevo";
        CAdd["Quit"] = "Salir";
    })(CAdd || (CAdd = {}));
    console.clear();
    inquirer.prompt({ type: "list", name: "AddGrupo", message: "Añadir Canciones:",
        choices: Object.values(CAdd) })
        .then(answers => {
        switch (answers["AddGrupo"]) {
            case CAdd.Nueva:
                process.stdout.write('Nombre> ');
                const n = scanf('%s');
                process.stdout.write('Componentes separados por ","> ');
                const a = scanf('%s');
                const c = a.split(',');
                process.stdout.write('Año de creacion> ');
                const d = scanf('%s');
                process.stdout.write('Generos separados por ","> ');
                const b = scanf('%s');
                const g = b.split(',');
                process.stdout.write('Albumes separados por ","> ');
                const e = scanf('%s');
                const al = e.split(',');
                process.stdout.write('Oyentes mensuales> ');
                const o = scanf('%d');
                gruCol.addGrupo(n, c, d, g, al, o);
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
        CList["Navegar"] = "Navegar";
        CList["Quit"] = "Salir";
    })(CList || (CList = {}));
    console.clear();
    gruCol.displayGrupos();
    inquirer.prompt({
        type: "list",
        name: "comand",
        message: "Teclee para continuar",
        choices: Object.values(CList),
    }).then(answers => {
        switch (answers["comand"]) {
            case CList.Navegar:
                // promptOrdenCancion();
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
        Comandos["Add"] = "A\u00F1adir grupo";
        Comandos["List"] = "Listar grupos";
        Comandos["Delete"] = "Borrar grupo";
        Comandos["Mod"] = "Modificar grupo";
        Comandos["Purge"] = "Borrar grupos";
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
