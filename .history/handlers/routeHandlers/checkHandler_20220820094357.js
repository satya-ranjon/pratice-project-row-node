/*
 * Title: check Handler
 * Description: check Handler
 * Author: Satya Ranjon
 * Date : 20/08/2022
 */
//  ?  dependencies
const { read, create } = require("../../lib/data");
const data = require("../../lib/data");
const { hash } = require("../../helpers/utiities");
const { parseJSON } = require("../../helpers/utiities");
const tokenHandler = require("./tokenHandler");

// ? module scaffolding
const handler = {};

handler.userHandler = (requestProperties, callback) => {
  const accptedMethods = ["get", "post", "put", "delete"];
  if (accptedMethods.indexOf(requestProperties.method) > -1) {
    handler._check[requestProperties.method](requestProperties, callback);
  } else {
    callback(405);
  }
};

handler._check = {};

// ! create user info
handler._check.post = (requestProperties, callback) => {};

// ! retrieve user info
handler._check.get = (requestProperties, callback) => {};

// ! user info update
handler._check.put = (requestProperties, callback) => {};

// ! delete user info
handler._check.delete = (requestProperties, callback) => {};

module.exports = handler;
