/*
 * Title: user Handler
 * Description: user Handler
 * Author: Satya Ranjon
 * Date : 18/08/2022
 */

// -->: dependencies
const { read, create, get, put } = require("../../lib/data");
const { hash, parseJSON } = require("../../helpers/utiities");

// module scaffolding
const handler = {};

handler.userHandler = (requestProperties, callback) => {
  const accptedMethods = ["get", "post", "put", "delete"];
  if (accptedMethods.indexOf(requestProperties.method) > -1) {
    handler._users[requestProperties.method](requestProperties, callback);
  } else {
    callback(405);
  }
};
handler._users = {};
handler._users.post = (requestProperties, callback) => {
  //> check the data
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
    requestProperties.body.tosAreement
      ? requestProperties.body.tosAreement
      : false;

  if (firstName && lastName && phoneNum && password && tosAreement) {
    // >> make sure that the user doesn't alwarady exist
    read("users", phoneNum, (err) => {
      if (err) {
        const userObj = {
          firstName,
          lastName,
          phoneNum,
          password: hash(password),
          tosAreement,
        };

        //! store the user to db
        create("users", phoneNum, userObj, (err) => {
          if (!err) {
            callback(200, { message: "User was created successfully !" });
          } else {
            callback(500, { error: "Could not create user !" });
          }
        });
      } else {
        callback(500, { error: "There was a problem in server side !" });
      }
    });
  } else {
    callback(400, { error: "You have a problem in your request" });
  }
};

handler._users.get = (requestProperties, callback) => {
  const phoneNum =
    typeof requestProperties.queryStringObject.phoneNum === "string" &&
    requestProperties.queryStringObject.phoneNum.trim().length === 11
      ? requestProperties.queryStringObject
      : false;
  if (phoneNum) {
    //? lookup the user
    read("users", phoneNum, (err, user) => {
      const users = { ...parseJSON(user) };
      if ((!err, users)) {
        delete users.password;
        callback(200, user);
      } else {
        callback(404, {
          error: "Requested user was not found!",
        });
      }
    });
  }
};
handler._users.put = (requestProperties, callback) => {};
handler._users.delete = (requestProperties, callback) => {};

module.exports = handler;
