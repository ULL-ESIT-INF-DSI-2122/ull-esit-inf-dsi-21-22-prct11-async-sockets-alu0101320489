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
exports.postCancionRouter = void 0;
const express = __importStar(require("express"));
const canciones_1 = require("../../models/canciones");
exports.postCancionRouter = express.Router();
/* Crear una nueva canción y guardarla en la base de datos. */
exports.postCancionRouter.post('/canciones', async (req, res) => {
    const cancion = new canciones_1.Cancion(req.body);
    try {
        await cancion.save();
        res.status(201).send(cancion);
    }
    catch (error) {
        res.status(400).send(error);
    }
});
