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
exports.promptUser = exports.promptList = exports.promptOrdenCancion = exports.promptAdd = exports.promptMod = exports.promptDeleteExisting = exports.promptDelete = void 0;
const inquirer = __importStar(require("inquirer"));
const can = __importStar(require("../estructura/cancion"));
let scanf = require('scanf');
const index_1 = require("./index");
const canCol = new can.JsonCancionCollection([]);
let onlySingles = false; // Al principio se muestran todos
function promptDelete() {
    let CDel;
    (function (CDel) {
        CDel["Borrar"] = "Borrar una cancion exisitente";
        CDel["Quit"] = "Salir";
    })(CDel || (CDel = {}));
    console.clear();
    inquirer.prompt({ type: "list", name: "DelCan", message: "Añadir Canciones:",
        choices: Object.values(CDel) })
        .then(answers => {
        switch (answers["DelCan"]) {
            case CDel.Borrar:
                process.stdout.write('Nombre> ');
                const n = scanf('%s');
                // if (col.getCancionByName(n) != undefined) {
                canCol.deleteCancion(n);
                console.log(n, " se elimino correctamente.");
                // } else {
                //  console.log('Error. ', n, ' no se encontro en Guardados.');
                // }
                scanf('%s');
                promptUser();
                break;
            case CDel.Quit:
                promptUser();
                break;
        }
    });
}
exports.promptDelete = promptDelete;
function promptDeleteExisting() {
    console.clear();
    inquirer.prompt({
        type: "checkbox", name: "DelCanEx",
        message: "Seleccione las canciones que quiera borrar: ",
        choices: canCol.coleccion.map(e => e.getNombre())
    })
        .then(answers => {
        let borradas = answers["DelCanEx"];
        canCol.deleteCancionesVector(borradas);
        promptUser();
    });
}
exports.promptDeleteExisting = promptDeleteExisting;
function promptMod() {
    let CMod;
    (function (CMod) {
        CMod["Mod"] = "Modificar";
        CMod["Quit"] = "Salir";
    })(CMod || (CMod = {}));
    console.clear();
    inquirer.prompt({ type: "list", name: "ModCancion", message: "Modificar Canciones:",
        choices: Object.values(CMod) })
        .then(answers => {
        switch (answers["ModCancion"]) {
            case CMod.Mod:
                process.stdout.write('Nombre> ');
                const n = scanf('%s');
                if (canCol.includesCancion(n)) {
                    process.stdout.write('Autor> ');
                    const a = scanf('%s');
                    process.stdout.write('Duracion> ');
                    const d = scanf('%s');
                    process.stdout.write('Single?> ');
                    const s = (scanf('%d') > 0) ? true : false;
                    process.stdout.write('Reproducciones> ');
                    const r = scanf('%d');
                    canCol.deleteCancion(n);
                    canCol.addCancion(n, a, [], d, s, r);
                }
                else {
                    console.log(n, ' no esta guardada.');
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
        CAdd["Nueva"] = "A\u00F1adir una cancion nueva";
        CAdd["Existente"] = "A\u00F1adir una cancion existente";
        CAdd["Quit"] = "Salir";
    })(CAdd || (CAdd = {}));
    console.clear();
    inquirer.prompt({ type: "list", name: "AddCancion", message: "Añadir Canciones:",
        choices: Object.values(CAdd) })
        .then(answers => {
        switch (answers["AddCancion"]) {
            case CAdd.Nueva:
                process.stdout.write('Nombre> ');
                const n = scanf('%s');
                process.stdout.write('Autor> ');
                const a = scanf('%s');
                process.stdout.write('Duracion> ');
                const d = scanf('%s');
                process.stdout.write('Single?> ');
                const s = (scanf('%d') > 0) ? true : false;
                process.stdout.write('Reproducciones> ');
                const r = scanf('%d');
                // const c: Cancion = new Cancion(n, a, [], d, s, r);
                canCol.addCancion(n, a, [], d, s, r);
                promptUser();
                break;
            case CAdd.Existente:
                promptUser();
                break;
            case CAdd.Quit:
                promptUser();
                break;
        }
    });
}
exports.promptAdd = promptAdd;
function promptOrdenCancion() {
    let OrdenCancion;
    (function (OrdenCancion) {
        OrdenCancion["Single"] = "Mostrar / Ocultar Singles";
        OrdenCancion["Repr"] = "Por numero de reproducciones";
        OrdenCancion["Alph"] = "Alfabeticamente";
    })(OrdenCancion || (OrdenCancion = {}));
    console.clear();
    inquirer.prompt({
        type: "list", name: "OrdenCan",
        message: "Seleccione como quiere ordenar las canciones: ",
        choices: Object.values(OrdenCancion)
    })
        .then(answers => {
        switch (answers["OrdenCan"]) {
            case OrdenCancion.Single:
                onlySingles = !onlySingles;
                canCol.ordSingles(onlySingles);
                promptList();
                break;
            case OrdenCancion.Repr:
                process.stdout.write('Ascendentemente?> ');
                const ascR = (scanf('%d') > 0) ? true : false;
                canCol.ordReproducciones(ascR);
                promptList();
                break;
            case OrdenCancion.Alph:
                process.stdout.write('Ascendentemente?> ');
                const ascA = (scanf('%d') > 0) ? true : false;
                canCol.ordAlfabeticoTitulo(ascA);
                promptList();
                break;
            default:
                promptUser();
                break;
        }
    });
}
exports.promptOrdenCancion = promptOrdenCancion;
function promptList() {
    let CList;
    (function (CList) {
        CList["Ordenar"] = "Ordenar";
        CList["Quit"] = "Salir";
    })(CList || (CList = {}));
    console.clear();
    canCol.displayMode();
    inquirer.prompt({
        type: "list",
        name: "comand",
        message: "Teclee para continuar",
        choices: Object.values(CList),
    }).then(answers => {
        switch (answers["comand"]) {
            case CList.Ordenar:
                promptOrdenCancion();
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
        Comandos["Add"] = "A\u00F1adir cancion";
        Comandos["List"] = "Listar canciones";
        Comandos["Delete"] = "Borrer cancion";
        Comandos["Mod"] = "Modificar cancion";
        Comandos["escuchada"] = "Marcar como escuchada";
        Comandos["Toggle"] = "Show/Hide escuchadas";
        Comandos["Purge"] = "Borrar Canciones";
        Comandos["Quit"] = "Quit";
    })(Comandos || (Comandos = {}));
    let showEscuchadas = false;
    console.clear();
    inquirer.prompt({
        type: "list",
        name: "command",
        message: "Choose option",
        choices: Object.values(Comandos),
    }).then((answers) => {
        switch (answers["command"]) {
            case Comandos.Toggle:
                showEscuchadas = !showEscuchadas;
                promptUser();
                break;
            case Comandos.Add:
                promptAdd();
                break;
            case Comandos.Delete:
                promptDeleteExisting();
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
