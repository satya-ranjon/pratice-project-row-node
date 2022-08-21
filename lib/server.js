/*
 * Title: Server library
 * Description: Server related files
 * Author: Satya Ranjon
 * Date : 21/08/2022
 */

// dependencies
const http = require("http");
const { handelReqRes } = require("../helpers/handleReqRes");
const environment = require("../helpers/environments");

// app object - module scaffolding
const server = {};

// create server
server.createServer = () => {
  const carateServerVaribal = http.createServer(server.handleReqRes);
  carateServerVaribal.listen(environment.port, () => {
    console.log(`listening to port ${environment.port}`);
  });
};
// handle Request Response

server.handleReqRes = handelReqRes;
// start the server
server.init = () => {
  server.createServer();
};

// > export the server
module.exports = server;
