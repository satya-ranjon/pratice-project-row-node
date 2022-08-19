/*
 * Title: Routes
 * Description: Application routes
 * Author: Satya Ranjon
 * Date : 5/08/2022
 */
// dependencies
const { sampleHandler } = require("./handlers/routeHandlers/sampleHandler");
const { userHandler } = require("./handlers/routeHandlers/userHandler");

const routes = {
  sample: sampleHandler,
  user: userHandler,
  token: tokenHandler,
};

module.exports = routes;
