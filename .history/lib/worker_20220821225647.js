/*
 * Title: Worker Libary
 * Description: Worker object file
 * Author: Satya Ranjon
 * Date : 5/08/2022
 */

// dependencies

// configuration

// create server
server.createServer = () => {
  const createServerVariable = http.createServer(app.handleReqRes);
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
