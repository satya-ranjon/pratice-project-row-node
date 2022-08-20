/*
 * Title: check Handler
 * Description: check Handler
 * Author: Satya Ranjon
 * Date : 20/08/2022
 */
//  ?  dependencies
const data = require("../../lib/data");
const { createRandomString } = require("../../helpers/utiities");
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

// ! creat check info
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

        // lookup the user data
        data.read("users", userPhone, (err, userData) => {
          if (!err && userData) {
            tokenHandler._token.verify(token, userPhone, (tokenIsValid) => {
              if (tokenIsValid) {
                const userObject = parseJSON(userData);
                const userCheck =
                  typeof userObject.checks === "object" &&
                  userObject.checks instanceof Array
                    ? userObject.checks
                    : [];
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
                    error: "User has alrady reached max check limit!",
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

// ! retrieve check info
handler._check.get = (requestProperties, callback) => {
  const id =
    typeof requestProperties.queryStringObject.id === "string" &&
    requestProperties.queryStringObject.id.trim().length === 20
      ? requestProperties.queryStringObject.id
      : false;
  if (id) {
    // ? lookup the check
    data.read("checks", id, (err, checkData) => {
      if (!err && checkData) {
        const userData = parseJSON(checkData);
        // > token verfy
        const token =
          typeof requestProperties.headerObject.token === "string"
            ? requestProperties.headerObject.token
            : false;
        tokenHandler._token.verify(
          token,
          userData.userPhone,
          (tokenIsValid) => {
            if (tokenIsValid) {
              callback(200, userData);
            } else {
              callback(403, { error: "Authentication problem !" });
            }
          }
        );
      } else {
        callback(500, { error: "You have a server side problem !" });
      }
    });
  } else callback(400, { error: "Your request is not valid !" });
};

// ! check info update
handler._check.put = (requestProperties, callback) => {
  const id =
    typeof requestProperties.body.id === "string" &&
    requestProperties.body.id.trim().length === 20
      ? requestProperties.body.id
      : false;
  // > valid input
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

  if (id) {
    if (protocol || url || succcessCodes || timeoutSecounds || method) {
      data.read("checks", id, (err, checkData) => {
        if (!err && checkData) {
          const checkObject = parseJSON(checkData);

          //> token varify
          const token =
            typeof requestProperties.headerObject.token === "string"
              ? requestProperties.headerObject.token
              : false;
          console.log(token);
          tokenHandler._token.verify(
            token,
            checkObject.userPhone,
            (tokenIsValid) => {
              if (tokenIsValid) {
                if (protocol) {
                  checkObject.protocol = protocol;
                }
                if (url) {
                  checkObject.url = url;
                }
                if (method) {
                  checkObject.method = method;
                }
                if (succcessCodes) {
                  checkObject.succcessCodes = succcessCodes;
                }
                if (timeoutSecounds) {
                  checkObject.timeoutSecounds = timeoutSecounds;
                }
                // > store the checkObject
                data.update("checks", id, checkObject, (err) => {
                  if (!err) {
                    callback(200, {
                      message: "You have update successfully !",
                    });
                  } else {
                    callback(500, {
                      error: "There was a server side problem !",
                    });
                  }
                });
              } else {
                callback(403, {
                  error: "Authentication Problem ! ",
                });
              }
            }
          );
        } else {
          callback(500, {
            error: "There was a server side problem !",
          });
        }
      });
    } else {
      callback(400, {
        error:
          "Your data is not valid & please input the valid data & You must provide at least one field to update! ",
      });
    }
  } else {
    callback(400, { error: "Your request is not valid !" });
  }
};

// ! delete check info
handler._check.delete = (requestProperties, callback) => {
  const id =
    typeof requestProperties.queryStringObject.id === "string" &&
    requestProperties.queryStringObject.id.trim().length === 20
      ? requestProperties.queryStringObject.id
      : false;
  if (id) {
    // > lookup the check
    data.read("checks", id, (err, checkData) => {
      if (!err && checkData) {
        const checkObj = parseJSON(checkData);
        //> token verify
        const token =
          typeof requestProperties.headerObject.token === "string"
            ? requestProperties.headerObject.token
            : false;
        tokenHandler._token.verify(
          token,
          checkObj.userPhone,
          (tokenIsValid) => {
            if (tokenIsValid) {
              // > delete the checkObj data
              data.delete("checks", id, (err) => {
                if (!err) {
                  console.log(checkObj.userPhone);
                  data.read("users", checkObj.userPhone, (err, userData) => {
                    // --> check console
                    if (!err && userData) {
                      const userObj = parseJSON(userData);
                      const userChecks =
                        typeof userObj.checks === "object" &&
                        userObj.checks instanceof Array
                          ? userObj.checks
                          : [];

                      // > remove the deleted check id from user's of checks
                      const checkPosition = userChecks.indexOf(id);
                      if (checkPosition > -1) {
                        userChecks.splice(checkPosition, 1);
                        // >  resave the user data
                        userObj.checks = userChecks;
                        data.update(
                          "users",
                          userObj.phoneNum,
                          userObj,
                          (err) => {
                            if (!err) {
                              callback(200, {
                                message: "Your data delete successfully !",
                              });
                            } else {
                              callback(500, {
                                error: "There was a server side problem ! 5 ",
                              });
                            }
                          }
                        );
                      } else {
                        callback(500, {
                          error: "There was a server side problem ! 4 ",
                        });
                      }
                    } else {
                      callback(500, {
                        error: "There was a server side problem ! 3 ",
                      });
                    }
                  });
                } else {
                  callback(500, {
                    error: "There was a server side problem ! 2 ",
                  });
                }
              });
            } else {
              callback(403, { error: "Authentication Problem !" });
            }
          }
        );
      } else {
        callback(500, { error: "There was a server side problem ! 1 " });
      }
    });
  } else {
    callback(400, { error: "Your request has a problem !" });
  }
};

module.exports = handler;
