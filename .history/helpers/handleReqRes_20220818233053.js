/*
 * Title: Handle Request and Response
 * Description: Handle Request and Response
 * Author: Satya Ranjon
 * Date : 5/08/2022
 */

// dependencies
const url = require("url");
const { StringDecoder } = require("string_decoder");
const routes = require("../routes");
const {
  notFoundHandler,
} = require("../handlers/routeHandlers/notfoundHandler");
const { parseJSON } = require("../helpers/utiities");
// module scaffolding
const handler = {};

handler.handelReqRes = (req, res) => {
  // request handel

  // get the url and parse it
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const trimmedPath = path.replace(/^\/+|\/+$/g, "");
  const method = req.method.toLowerCase();
  const queryStringObject = parsedUrl.query;
  const headerObject = req.headers;

  const requestProperties = {
    parsedUrl,
    path,
    trimmedPath,
    method,
    queryStringObject,
    headerObject,
    body,
  };

  const decoder = new StringDecoder("utf8");
  let real_data = "";

  const chosenHandler = routes[trimmedPath]
    ? routes[trimmedPath]
    : notFoundHandler;

  req.on("data", (buffer) => {
    real_data += decoder.write(buffer);
  });

  req.on("end", () => {
    real_data += decoder.end();
    console.log(requestProperties.body);
    requestProperties.body = parseJSON(real_data);

    chosenHandler(requestProperties, (statusCode, payload) => {
      statusCode = typeof statusCode === "number" ? statusCode : 500;
      payload = typeof payload === "object" ? payload : {};

      const payloadString = JSON.stringify(payload);

      // return the final response
      res.setHeader("Content-Type", "application/json");
      res.writeHead(statusCode);
      res.end(payloadString);
    });
  });
};

module.exports = handler;
