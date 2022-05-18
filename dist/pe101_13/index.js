"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("./mongoose");
const getDeportista_1 = require("./deportistaRouters/getDeportista");
const postDeportista_1 = require("./deportistaRouters/postDeportista");
const deleteDeportista_1 = require("./deportistaRouters/deleteDeportista");
const patchDeportista_1 = require("./deportistaRouters/patchDeportista");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(postDeportista_1.postDeportistaRouter);
app.use(getDeportista_1.getDeportistaRouter);
app.use(patchDeportista_1.patchDeportistaRouter);
app.use(deleteDeportista_1.deleteDeportistaRouter);
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});
