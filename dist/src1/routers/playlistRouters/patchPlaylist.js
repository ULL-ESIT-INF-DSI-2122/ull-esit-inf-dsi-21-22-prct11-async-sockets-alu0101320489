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
exports.patchPlaylistRouter = void 0;
const express = __importStar(require("express"));
const playlists_1 = require("../../models/playlists");
exports.patchPlaylistRouter = express.Router();
/* Esta es una solicitud de parche que actualiza una lista de reproducción por nombre. */
exports.patchPlaylistRouter.patch('/playlist', async (req, res) => {
    if (!req.query.name) {
        return res.status(400).send({
            error: 'A title must be provided',
        });
    }
    const allowedUpdates = ['name', 'generos', 'canciones', 'duracion'];
    const actualUpdates = Object.keys(req.body);
    const isValidUpdate = actualUpdates.every((update) => allowedUpdates.includes(update));
    if (!isValidUpdate) {
        return res.status(400).send({
            error: 'Update is not permitted',
        });
    }
    try {
        const playlist = await playlists_1.Playlist.findOneAndUpdate({ title: req.query.name.toString() }, req.body, {
            new: true,
            runValidators: true,
        });
        if (!playlist) {
            return res.status(404).send();
        }
        return res.send(playlist);
    }
    catch (error) {
        return res.status(400).send(error);
    }
});
/* Esta es una solicitud de parche que actualiza una lista de reproducción por id. */
exports.patchPlaylistRouter.patch('/playlist/:id', async (req, res) => {
    const allowedUpdates = ['name', 'generos', 'canciones', 'duracion'];
    const actualUpdates = Object.keys(req.body);
    const isValidUpdate = actualUpdates.every((update) => allowedUpdates.includes(update));
    if (!isValidUpdate) {
        return res.status(400).send({
            error: 'Update is not permitted',
        });
    }
    try {
        const playlist = await playlists_1.Playlist.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!playlist) {
            return res.status(404).send();
        }
        return res.send(playlist);
    }
    catch (error) {
        return res.status(400).send(error);
    }
});
