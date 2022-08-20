/*
 * Title: check Handler
 * Description: check Handler
 * Author: Satya Ranjon
 * Date : 20/08/2022
 */
//  ?  dependencies
const { read, create } = require("../../lib/data");
const data = require("../../lib/data");
const { hash, createRandomString } = require("../../helpers/utiities");
const { parseJSON } = require("../../helpers/utiities");
const tokenHandler = require("./tokenHandler");
const { maxChecks } = require("../../helpers/environments");
// ? module scaffolding
const handler = {};

handler.checkHandler = (requestProperties, callback) => {
  const accptedMethods = ["get", "post", "put", "delete"];
  if (accptedMethods.indexOf(requestProperties.method) > -1) {
    handler._check[requestProperties.method](requestProperties, callback);
  } else {
    callback(405);
  }
};

handler._check = {};

// ! create user info
handler._check.post = (requestProperties, callback) => {
  const protocol =
    typeof requestProperties.body.protocol === "string" &&
    ["http", "https"].indexOf(requestProperties.body.protocol) > -1
      ? requestProperties.body.protocol
      : false;
  const url =
    typeof requestProperties.body.url === "string" &&
    requestProperties.body.url.trim().length > 0
      ? requestProperties.body.url
      : false;
  const method =
    typeof requestProperties.body.method === "string" &&
    ["GET", "POST", "PUT", "DELETE"].indexOf(requestProperties.body.method) > -1
      ? requestProperties.body.method
      : false;
  const succcessCodes =
    typeof requestProperties.body.succcessCodes === "object" &&
    requestProperties.body.succcessCodes instanceof Array
      ? requestProperties.body.succcessCodes
      : false;
  const timeoutSecounds =
    typeof requestProperties.body.timeoutSecounds === "number" &&
    requestProperties.body.timeoutSecounds % 1 === 0 &&
    requestProperties.body.timeoutSecounds >= 1 &&
    requestProperties.body.timeoutSecounds <= 5
      ? requestProperties.body.timeoutSecounds
      : false;

  if (protocol && url && method && succcessCodes && timeoutSecounds) {
    // ? token verify
    const token =
      typeof requestProperties.headerObject.token === "string"
        ? requestProperties.headerObject.token
        : false;

    // ? lookup the user phone by reading the token
    data.read("tokens", token, (err, tokenData) => {
      if (!err && tokenData) {
        const userPhone = parseJSON(tokenData).phoneNum;
        console.log(userPhone);
        // lookup the user data
        data.read("users", userPhone, (err, userData) => {
          if (err && userData) {
            tokenHandler._token.verify(token, userPhone, (tokenIsValid) => {
              if (tokenIsValid) {
                const userObject = parseJSON(userData);
                const userCheck =
                  typeof userObject.checks === "object" &&
                  userObject.checks instanceof Array
                    ? userObject.checks
                    : {};
                if (userCheck.length < maxChecks) {
                  const checkId = createRandomString(20);
                  const checkObject = {
                    id: checkId,
                    userPhone,
                    protocol,
                    url,
                    method,
                    succcessCodes,
                    timeoutSecounds,
                  };
                  // > save the object
                  data.create("checks", checkId, checkObject, (err) => {
                    if (!err) {
                      //> add check id to the user's objects
                      userObject.checks = userCheck;
                      userObject.checks.push(checkId);
                      // > save the new user data
                      data.update("users", userPhone, userObject, (err) => {
                        if (!err) {
                          // > return the data about the new check
                          callback(200, checkObject);
                        } else {
                          callback(500, {
                            error: "There was a server side problem !",
                          });
                        }
                      });
                    } else {
                      callback(500, {
                        error: "There was a server side problem !",
                      });
                    }
                  });
                } else {
                  callback(401, {
                    error: "Userhas alrady reached max check limit!",
                  });
                }
              } else {
                callback(403, { error: "Your token is not valid" });
              }
            });
          } else {
            callback(403, { error: "User not found !" });
          }
        });
      } else {
        callback(403, { error: "Authentication problem !" });
      }
    });
  } else {
    callback(400, { error: "You have a problem in your request !" });
  }
};

// ! retrieve user info
handler._check.get = (requestProperties, callback) => {};

// ! user info update
handler._check.put = (requestProperties, callback) => {};

// ! delete user info
handler._check.delete = (requestProperties, callback) => {};

module.exports = handler;
