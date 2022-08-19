/*
 * Title: user Handler
 * Description: user Handler
 * Author: Satya Ranjon
 * Date : 18/08/2022
 */

// module scaffolding
const handler = {};

handler.userHandler = (requestProperties, callback) => {
  // console.log(requestProperties);
  const accptedMethods = ["get", "post", "put", "delete"];
  callback(200, {
    message: "This is a User url",
  });
};

module.exports = handler;