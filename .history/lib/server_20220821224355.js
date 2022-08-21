/*
 * Title: Project initial file to start the node server workers
 * Description: Project initial file to start the node server workers
 * Author: Satya Ranjon
 * Date : 5/08/2022
 */

// dependencies
const http = require("http");
const { handelReqRes } = require("./helpers/handleReqRes");
const environment = require("./helpers/environments");
const data = require("./lib/data");
// app object - module scaffolding
const app = {};

// configuration

// create server
app.createServer = () => {
  const server = http.createServer(app.handleReqRes);
  server.listen(environment.port, () => {
    console.log(`listening to port ${environment.port}`);
  });
};
// handle Request Response

app.handleReqRes = handelReqRes;
// start the server
app.createServer();
