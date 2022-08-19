/*
 * Title: user Handler
 * Description: user Handler
 * Author: Satya Ranjon
 * Date : 18/08/2022
 */

// -->: dependencies
const { read, create } = require("../../lib/data");
const data = require("../../lib/data");
const { hash } = require("../../helpers/utiities");
const { parseJSON } = require("../../helpers/utiities");

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

// ! create user info
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

// ! retrieve user info
handler._users.get = (requestProperties, callback) => {
  const phoneNum =
    typeof requestProperties.queryStringObject.phoneNum === "string" &&
    requestProperties.queryStringObject.phoneNum.trim().length === 11
      ? requestProperties.queryStringObject.phoneNum
      : false;

  if (phoneNum) {
    // lookup the user
    read("users", phoneNum, (err, u) => {
      const user = { ...parseJSON(u) };
      if (!err && user) {
        delete user.password;
        callback(200, user);
      } else {
        callback(404, {
          error: "Requested user was not found!",
        });
      }
    });
  } else {
    callback(404, {
      error: "Requested user was not found!",
    });
  }
};

// ! user info update
handler._users.put = (requestProperties, callback) => {
  // > check the phoneNum firstName lastName password if valid
  const phoneNum =
    typeof requestProperties.body.phoneNum === "string" &&
    requestProperties.body.phoneNum.trim().length === 11
      ? requestProperties.body.phoneNum
      : false;

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
  const password =
    typeof requestProperties.body.password === "string" &&
    requestProperties.body.password.trim().length > 0
      ? requestProperties.body.password
      : false;

  if (phoneNum) {
    if (firstName || lastName || password) {
      //? lookup the user
      read("user", phoneNum, (err, userData) => {
        const user = { ...parseJSON(userData) };
        if (!err && userData) {
          if (firstName) {
            userData.firstName = firstName;
          }
          if (lastName) {
            userData.lastName = lastName;
          }
          if (password) {
            userData.firstName = password;
          }
          //> store the data in database
          data.update("user", phoneNum, userData, (err) => {
            if (!err) {
              callback(200, { message: "User was update successfully !" });
            } else {
              callback(500, {
                error: "There was a problem in the server side !",
              });
            }
          });
        } else {
          callback(400, { error: "You have a problem your request" });
        }
      });
    } else {
      callback(400, { error: "You have a problem your request" });
    }
  } else {
    callback(400, { error: "Invalid phone number. Please try again!" });
  }
};

// ! delete user info
handler._users.delete = (requestProperties, callback) => {
  const phoneNum =
    typeof requestProperties.queryStringObject.phoneNum === "string" &&
    requestProperties.queryStringObject.phoneNum.trim().length === 11
      ? requestProperties.queryStringObject.phoneNum
      : false;

  if (phoneNum) {
    // lookup the user
    read("users", phoneNum, (err, userData) => {
      if (!err && userData) {
        data.delete("users", phoneNum, (err) => {
          if (!err) {
            callback(200, {
              message: "User was successfully deleted !",
            });
          } else {
            callback(500, { error: "There was a server side error !" });
          }
        });
      } else {
        callback(500, {
          error: "There was a server side error!",
        });
      }
    });
  } else {
    callback(404, {
      error: "Requested user was not found!",
    });
  }
};

module.exports = handler;
