/*
 * Title: user Handler
 * Description: user Handler
 * Author: Satya Ranjon
 * Date : 18/08/2022
 */

// -->: dependencies
const { read } = require("../../lib/data");

// module scaffolding
const handler = {};

handler.userHandler = (requestProperties, callback) => {
  const accptedMethods = ["get", "post", "put", "delete"];
  if (accptedMethods.indexOf(requestProperties.method) > -1) {
    handler._users[requestProperties.method](requestProperties, callback);
  } else {
    callback(405);
  }
  callback(200, {
    message: "This is a User url",
  });
};
handler._users = {};

handler._users.post = (requestProperties, callback) => {
  const firstName =
    typeof requestProperties.body.firstName === "string" &&
    requestProperties.body.firstName.trim().length > 0
      ? requestProperties.body.firstName
      : false;
  const lastName =
    typeof requestProperties.body.lastName === "string" &&
    requestProperties.body.lastName.trim().length > 0
      ? requestProperties.body.lastName
      : false;
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
  const tosAreement =
    typeof requestProperties.body.tosAreement === "boolean" &&
    requestProperties.body.tosAreement.trim().length > 0
      ? requestProperties.body.tosAreement
      : false;

  if (firstName && lastName && phoneNum && password && tosAreement) {
    // -->: make sure that the user doesn't alwarady exist
    read("user", phoneNum, (err, user) => {
      if (err) {
        // -->: porar kaj
      } else {
      }
    });
  } else {
    callback(400, { error: "You have a problem in your request" });
  }
};
handler._users.get = (requestProperties, callback) => {
  callback(200);
};
handler._users.put = (requestProperties, callback) => {};
handler._users.delete = (requestProperties, callback) => {};

module.exports = handler;
