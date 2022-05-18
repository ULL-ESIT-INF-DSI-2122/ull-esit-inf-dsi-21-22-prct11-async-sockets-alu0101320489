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
exports.mainPrompt = void 0;
const inquirer = __importStar(require("inquirer"));
let scanf = require('scanf');
// Pantallas de cada uno de los datos almacenados
const can = __importStar(require("./cancionInq"));
const gru = __importStar(require("./grupoInq"));
const gen = __importStar(require("./generoInq"));
const alb = __importStar(require("./albumInq"));
const art = __importStar(require("./artistaInq"));
const pla = __importStar(require("./playlistInq"));
const ges = __importStar(require("./gestorInq"));
function mainPrompt() {
    let quit = false;
    let Comandos;
    (function (Comandos) {
        Comandos["can"] = "Canciones";
        Comandos["gru"] = "Grupos";
        Comandos["alb"] = "Albumes";
        Comandos["gen"] = "Generos";
        Comandos["art"] = "Artista";
        Comandos["pla"] = "Playlists";
        Comandos["Ges"] = "Gestor de Playlist";
        Comandos["Quit"] = "Quit";
    })(Comandos || (Comandos = {}));
    console.clear();
    inquirer.prompt({
        type: "list",
        name: "command",
        message: "Seleccione los datos que desea visualizar",
        choices: Object.values(Comandos),
    }).then((answers) => {
        switch (answers["command"]) {
            case Comandos.can:
                can.promptUser();
                break;
            case Comandos.gru:
                gru.promptUser();
                break;
            case Comandos.alb:
                alb.promptUser();
                break;
            case Comandos.gen:
                gen.promptUser();
                break;
            case Comandos.art:
                art.promptUser();
                break;
            case Comandos.pla:
                pla.promptUser();
                break;
            case Comandos.Ges:
                ges.promptUser();
                break;
            case Comandos.Quit:
                quit = true;
                console.log('Hasta pronto.');
                break;
        }
    });
}
exports.mainPrompt = mainPrompt;
mainPrompt();
