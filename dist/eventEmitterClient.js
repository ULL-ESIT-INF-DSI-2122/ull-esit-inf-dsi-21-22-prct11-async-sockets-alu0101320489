"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageEventEmitterClient = void 0;
const events_1 = require("events");
class MessageEventEmitterClient extends events_1.EventEmitter {
    constructor(connection) {
        super();
        let wholeData = '';
        connection.on('data', (dataChunk) => {
            wholeData += dataChunk;
            let messageLimit = wholeData.indexOf('\n');
            while (messageLimit !== -1) {
                const message = wholeData.substring(0, messageLimit);
                wholeData = wholeData.substring(messageLimit + 1);
                this.emit('message', JSON.parse(message));
                messageLimit = wholeData.indexOf('\n');
            }
        });
    }
}
exports.MessageEventEmitterClient = MessageEventEmitterClient;
