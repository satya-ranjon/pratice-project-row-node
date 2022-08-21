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
const app = {};

// create server
app.createServer = () => {
  const carateServerVaribal = http.createServer(app.handleReqRes);
  carateServerVaribal.listen(environment.port, () => {
    console.log(`listening to port ${environment.port}`);
  });
};
// handle Request Response

app.handleReqRes = handelReqRes;
// start the server
app.createServer();
