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
  } else {
    callback(405);
  }
  callback(200, {
    message: "This is a User url",
  });
};
handler._users = {};

handler._users.post = (requestProperties, callback) => {};

module.exports = handler;