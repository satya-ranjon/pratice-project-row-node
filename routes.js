/*
 * Title: Routes
 * Description: Application routes
 * Author: Satya Ranjon
 * Date : 5/08/2022
 */
// dependencies
const { sampleHandler } = require("./handlers/routeHandlers/sampleHandler");

const routes = {
  sample: sampleHandler,
};

module.exports = routes;
