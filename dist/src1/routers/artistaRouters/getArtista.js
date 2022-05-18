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
exports.getArtistaRouter = void 0;
const express = __importStar(require("express"));
const artista_1 = require("../../models/artista");
exports.getArtistaRouter = express.Router();
/* Este es un controlador de ruta para el punto final `/artista`.
Está utilizando el objeto `req.query` para obtener el parámetro de consulta `name`.
Si el parámetro de consulta `name` está presente, lo usará para filtrar los resultados.
Si el parámetro de consulta `nombre` no está presente, devolverá todas las listas de reproducción. */
exports.getArtistaRouter.get('/artista', async (req, res) => {
    const filter = req.query.name ? { title: req.query.name.toString() } : {};
    try {
        const artista = await artista_1.Artista.find(filter);
        if (artista.length !== 0) {
            return res.send(artista);
        }
        return res.status(404).send();
    }
    catch (error) {
        return res.status(500).send();
    }
});
/* Este es un controlador de ruta para el punto final `/artista/:id`.
Está utilizando `req.params.id` para obtener el parámetro `id`.
Si el parámetro `id` está presente, lo usará para filtrar los resultados.
Si el parámetro `id` no está presente, devolverá todas las listas de reproducción. */
exports.getArtistaRouter.get('/artista/:id', async (req, res) => {
    try {
        const artista = await artista_1.Artista.findById(req.params.id);
        if (!artista) {
            return res.status(404).send();
        }
        return res.send(artista);
    }
    catch (error) {
        return res.status(500).send();
    }
});
