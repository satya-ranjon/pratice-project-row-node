/*
 * Title: Token Handler
 * Description: Token Handler
 * Author: Satya Ranjon
 * Date : 19/08/2022
 */

//  @ dependencies
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
handler._token = {};

// ! create user info
handler._token.post = (requestProperties, callback) => {
  const phoneNum =
    typeof requestProperties.body.phoneNum === "string" &&
    requestProperties.body.phoneNum.trim().length === 11
      ? requestProperties.body.phoneNum
      : false;
  const password =
    typeof requestProperties.body.password === "string" &&
    requestProperties.body.password.trim().length > 0
      ? requestProperties.body.password
      : false;
  if (phoneNum && password) {
  } else {
  }
};

// ! retrieve user info
handler._token.get = (requestProperties, callback) => {};

// ! user info update
handler._token.put = (requestProperties, callback) => {};

// ! delete user info
handler._token.delete = (requestProperties, callback) => {};

module.exports = handler;
