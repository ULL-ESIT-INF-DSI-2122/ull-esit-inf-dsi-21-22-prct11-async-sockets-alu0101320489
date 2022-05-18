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
exports.deleteCancionRouter = void 0;
const express = __importStar(require("express"));
const canciones_1 = require("../../models/canciones");
exports.deleteCancionRouter = express.Router();
/* Esta es una ruta que borra una canción por su título. */
exports.deleteCancionRouter.delete('/canciones', async (req, res) => {
    if (!req.query.name) {
        return res.status(400).send({
            error: 'A title must be provided',
        });
    }
    try {
        const cancion = await canciones_1.Cancion.findOneAndDelete({ nombre: req.query.name.toString() });
        if (!cancion) {
            return res.status(404).send();
        }
        return res.send(cancion);
    }
    catch (error) {
        return res.status(400).send();
    }
});
/* Esta es una ruta que borra una canción por su id. */
exports.deleteCancionRouter.delete('/canciones/:id', async (req, res) => {
    try {
        const cancion = await canciones_1.Cancion.findByIdAndDelete(req.params.id);
        if (!cancion) {
            return res.status(404).send();
        }
        return res.send(cancion);
    }
    catch (error) {
        return res.status(400).send();
    }
});
