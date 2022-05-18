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
exports.getDeportistaRouter = void 0;
const express = __importStar(require("express"));
const deportista_1 = require("../deportista");
exports.getDeportistaRouter = express.Router();
/**
 * Busca por nombre
 */
exports.getDeportistaRouter.get('/deportista', async (req, res) => {
    const filter = req.query.nombre ? { nombre: req.query.nombre.toString() } : {};
    try {
        const deportista = await deportista_1.Deportista.find(filter);
        if (deportista.length !== 0) {
            return res.send(deportista);
        }
        return res.status(404).send();
    }
    catch (error) {
        return res.status(500).send();
    }
});
/**
 * Busca por DNI
 */
exports.getDeportistaRouter.get('/deportista', async (req, res) => {
    const filter = req.query.dni ? { NIF: req.query.dni.toString() } : {};
    try {
        const deportista = await deportista_1.Deportista.findById(filter);
        if (!deportista) {
            return res.status(404).send();
        }
        return res.send(deportista);
    }
    catch (error) {
        return res.status(500).send();
    }
});
