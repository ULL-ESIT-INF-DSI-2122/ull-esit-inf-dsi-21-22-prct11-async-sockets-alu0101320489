"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-case-declarations */
const net_1 = __importDefault(require("net"));
const aplicacion_1 = require("./aplicacion");
/**
 * Clase que crea un servidor para ejecutar comandos
 */
class Servidor {
    /**
     *
     * @param port puerto de conexion
     */
    constructor(port) {
        this.port = port;
    }
    /**
     * Crea y ejecuta el servidor
     */
    run() {
        const app = new aplicacion_1.Aplicacion();
        net_1.default.createServer({ allowHalfOpen: true }, (connection) => {
            console.log('A client has connected.');
            /**
             * Obtiene el mensaje completo del cliente
             */
            let wholeData = '';
            connection.on('data', (data) => {
                wholeData += data;
            });
            /**
             * Tras haber recibido todo el mensaje envía una repuesta al cliente, terminando la conexion
             */
            connection.on('end', () => {
                const message = JSON.parse(wholeData.toString());
                switch (message.type) {
                    case ('add'):
                        const s = app.add(message.usuario, message.titulo, message.data, message.color);
                        const response = { type: message.type, success: s };
                        connection.write(JSON.stringify(response));
                        connection.end();
                        break;
                }
            });
            connection.on('close', () => {
                console.log('A client has disconnected.');
            });
        }).listen(this.port, () => {
            console.log('Waiting for clients to connect.');
        });
    }
}
const s = new Servidor(60300);
s.run();
