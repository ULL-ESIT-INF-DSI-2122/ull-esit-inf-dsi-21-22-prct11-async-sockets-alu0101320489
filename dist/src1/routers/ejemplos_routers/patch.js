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
exports.patchRouter = void 0;
const express = __importStar(require("express"));
const note_1 = require("../models/note");
exports.patchRouter = express.Router();
exports.patchRouter.patch('/notes', async (req, res) => {
    if (!req.query.title) {
        return res.status(400).send({
            error: 'A title must be provided',
        });
    }
    const allowedUpdates = ['title', 'body', 'color'];
    const actualUpdates = Object.keys(req.body);
    const isValidUpdate = actualUpdates.every((update) => allowedUpdates.includes(update));
    if (!isValidUpdate) {
        return res.status(400).send({
            error: 'Update is not permitted',
        });
    }
    try {
        const note = await note_1.Note.findOneAndUpdate({ title: req.query.title.toString() }, req.body, {
            new: true,
            runValidators: true,
        });
        if (!note) {
            return res.status(404).send();
        }
        return res.send(note);
    }
    catch (error) {
        return res.status(400).send(error);
    }
});
exports.patchRouter.patch('/notes/:id', async (req, res) => {
    const allowedUpdates = ['title', 'body', 'color'];
    const actualUpdates = Object.keys(req.body);
    const isValidUpdate = actualUpdates.every((update) => allowedUpdates.includes(update));
    if (!isValidUpdate) {
        return res.status(400).send({
            error: 'Update is not permitted',
        });
    }
    try {
        const note = await note_1.Note.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!note) {
            return res.status(404).send();
        }
        return res.send(note);
    }
    catch (error) {
        return res.status(400).send(error);
    }
});
