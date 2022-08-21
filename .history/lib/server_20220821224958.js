/*
 * Title: SErver library
 * Description: Server related files
 * Author: Satya Ranjon
 * Date : 21/08/2022
 */

// dependencies
const http = require("http");
const { handelReqRes } = require("../helpers/handleReqRes");
const environment = require("./helpers/environments");

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
