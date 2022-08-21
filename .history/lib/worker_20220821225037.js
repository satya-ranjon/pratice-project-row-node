/*
 * Title: Project initial file
 * Description: Project initial file to start the node worker
 * Author: Satya Ranjon
 * Date : 5/08/2022
 */

// dependencies
const http = require("http");
const { handelReqRes } = require("./helpers/handleReqRes");
const environment = require("./helpers/environments");
const data = require("./lib/data");
//> app object - module scaffolding
const server = {};

// configuration

// create server
server.createServer = () => {
  const server = http.createServer(app.handleReqRes);
  server.listen(environment.port, () => {
    console.log(`listening to port ${environment.port}`);
  });
};
// handle Request Response

server.handleReqRes = handelReqRes;
// start the server
server.createServer();

// ? export the server
module.exports = server;
