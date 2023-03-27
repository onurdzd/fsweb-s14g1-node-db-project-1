const express = require("express");

const server = express();

server.use(express.json());

const accRouter=require("./accounts/accounts-router")

server.use("/api/accounts",accRouter)

module.exports = server;
