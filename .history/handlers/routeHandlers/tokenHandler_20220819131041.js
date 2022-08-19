/*
 * Title: Token Handler
 * Description: Token Handler
 * Author: Satya Ranjon
 * Date : 19/08/2022
 */

//  @ dependencies
const { read, create } = require("../../lib/data");
const data = require("../../lib/data");
const { hash } = require("../../helpers/utiities");
const { parseJSON } = require("../../helpers/utiities");

// module scaffolding
const handler = {};

handler.tokenHandler = (requestProperties, callback) => {
  const accptedMethods = ["get", "post", "put", "delete"];
  if (accptedMethods.indexOf(requestProperties.method) > -1) {
    handler._users[requestProperties.method](requestProperties, callback);
  } else {
    callback(405);
  }
};
