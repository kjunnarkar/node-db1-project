const express = require("express");
const db = require("../data/dbConfig.js");
const AccountsRouter = require('./accounts-router');

const server = express();

server.use(express.json());

server.use('/api/accounts', AccountsRouter);

server.get('/', (req, res) => {
    res.send({ Success: 'The API is running' });
});

module.exports = server;
