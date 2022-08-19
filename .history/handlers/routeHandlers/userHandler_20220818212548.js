/*
 * Title: user Handler
 * Description: user Handler
 * Author: Satya Ranjon
 * Date : 18/08/2022
 */

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
};
handler._users.get = (requestProperties, callback) => {
  callback(200);
};
handler._users.put = (requestProperties, callback) => {};
handler._users.delete = (requestProperties, callback) => {};

module.exports = handler;
