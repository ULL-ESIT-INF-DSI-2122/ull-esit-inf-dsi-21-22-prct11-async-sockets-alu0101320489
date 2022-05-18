"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const dbURL = 'mongodb://127.0.0.1:27017';
const dbName = 'notes-app';
mongodb_1.MongoClient.connect(dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then((client) => {
    const db = client.db(dbName);
    return db.collection('notes').insertOne({
        title: 'Red note',
        body: 'This is a red note',
        color: 'red',
    });
}).then((result) => {
    console.log(result);
}).catch((error) => {
    console.log(error);
});
