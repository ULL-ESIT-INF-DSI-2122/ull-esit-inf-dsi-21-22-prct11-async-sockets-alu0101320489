"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const net_1 = __importDefault(require("net"));
const yargs_1 = __importDefault(require("yargs"));
class Cliente {
    /**
     *
     * @param port Puerto de conexion
     */
    constructor(port) {
        this.port = port;
    }
    /**
     * Ejecuta el cliente
     */
    run() {
        const client = net_1.default.connect({ port: this.port });
        yargs_1.default.command({
            command: 'add',
            describe: 'Add a new note',
            builder: {
                usuario: {
                    describe: 'Note user',
                    demandOption: true,
                    type: 'string',
                },
                titulo: {
                    describe: 'Note title',
                    demandOption: true,
                    type: 'string',
                },
                data: {
                    describe: 'Note data',
                    demandOption: true,
                    type: 'string',
                },
                color: {
                    describe: 'Note color',
                    demandOption: true,
                    type: 'string',
                }
            },
            handler(argv) {
                if ((typeof argv.titulo === 'string') && (typeof argv.data === 'string') && (typeof argv.usuario === 'string') && (typeof argv.color === 'string')) {
                    const request = { type: 'add', usuario: argv.usuario, titulo: argv.titulo, data: argv.data, color: argv.color };
                    client.write(JSON.stringify(request));
                    client.end();
                }
            },
        });
        yargs_1.default.parse();
        /**
         * Recibe la respuesta del servidor
         */
        let wholeData = '';
        client.on('data', (dataJSON) => {
            wholeData += dataJSON;
        });
        /**
         * Cuando termina de recibir la respuesta, la muestra
         */
        client.on('end', () => {
            const message = JSON.parse(wholeData.toString());
            console.log(message);
        });
    }
}
const c = new Cliente(60300);
c.run();
