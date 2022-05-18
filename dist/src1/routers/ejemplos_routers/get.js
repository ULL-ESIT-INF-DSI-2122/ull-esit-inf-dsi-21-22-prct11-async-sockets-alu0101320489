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
exports.getRouter = void 0;
const express = __importStar(require("express"));
const note_1 = require("../models/note");
exports.getRouter = express.Router();
exports.getRouter.get('/notes', async (req, res) => {
    const filter = req.query.title ? { title: req.query.title.toString() } : {};
    try {
        const notes = await note_1.Note.find(filter);
        if (notes.length !== 0) {
            return res.send(notes);
        }
        return res.status(404).send();
    }
    catch (error) {
        return res.status(500).send();
    }
});
exports.getRouter.get('/notes/:id', async (req, res) => {
    try {
        const note = await note_1.Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send();
        }
        return res.send(note);
    }
    catch (error) {
        return res.status(500).send();
    }
});
