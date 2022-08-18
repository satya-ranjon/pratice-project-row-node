/*
 * Title: Uptime Monitoring Application
 * Description: A RESTFul API to moitor up or down time of user defined links
 * Author: Satya Ranjon
 * Date : 5/08/2022
 */

// dependencies
const http = require("http");
const { handelReqRes } = require("./helpers/handleReqRes");
const environment = require("./helpers/environments");
// app object - module scaffolding
const app = {};

// configuration
app.config = {
  port: 8000,
};

// create server
app.createServer = () => {
  const server = http.createServer(app.handleReqRes);
  server.listen(app.config.port, () => {
    console.log(`listening to port ${app.config.port}`);
  });
};
// handle Request Response

app.handleReqRes = handelReqRes;
// start the server
app.createServer();
