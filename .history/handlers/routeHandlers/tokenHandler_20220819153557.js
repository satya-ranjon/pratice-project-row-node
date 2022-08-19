/*
 * Title: Token Handler
 * Description: Token Handler
 * Author: Satya Ranjon
 * Date : 19/08/2022
 */

//  @ dependencies
const data = require("../../lib/data");
const {
  hash,
  createRandomString,
  parseJSON,
} = require("../../helpers/utiities");

// module scaffolding
const handler = {};

handler.tokenHandler = (requestProperties, callback) => {
  const accptedMethods = ["get", "post", "put", "delete"];
  if (accptedMethods.indexOf(requestProperties.method) > -1) {
    handler._token[requestProperties.method](requestProperties, callback);
  } else {
    callback(405);
  }
};
handler._token = {};

// ! create post token
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
    data.read("users", phoneNum, (err, userData) => {
      const hashedpassword = hash(password);
      if (hashedpassword === parseJSON(userData).password) {
        const tokenId = createRandomString(20);
        const expiresDate = Date.now() + 60 * 60 * 1000;
        const tokenObj = { phoneNum, id: tokenId, expiresDate };
        // ? store the token
        data.create("tokens", tokenId, tokenObj, (err) => {});
      } else {
        callback(400, { error: "Your password is not valid !" });
      }
    });
  } else {
    callback(400, { error: "You have a problem in your request" });
  }
};

// ! retrieve user info
handler._token.get = (requestProperties, callback) => {};

// ! user info update
handler._token.put = (requestProperties, callback) => {};

// ! delete user info
handler._token.delete = (requestProperties, callback) => {};

module.exports = handler;
