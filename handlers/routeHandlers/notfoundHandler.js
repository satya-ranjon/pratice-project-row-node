/*
 * Title: Not found  Handler
 * Description: Not found  Handler
 * Author: Satya Ranjon
 * Date : 5/08/2022
 */

// module scaffolding
const handler = {};

handler.notFoundHandler = (requestProperties, callback) => {
  callback(404, {
    message: "Your URL is not found",
  });
};

module.exports = handler;
