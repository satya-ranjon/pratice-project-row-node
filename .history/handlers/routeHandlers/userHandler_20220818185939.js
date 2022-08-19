/*
 * Title: user Handler
 * Description: user Handler
 * Author: Satya Ranjon
 * Date : 5/08/2022
 */

// module scaffolding
const handler = {};

handler.userHandler = (requestProperties, callback) => {
  // console.log(requestProperties);
  callback(200, {
    message: "This is a User url",
  });
};

module.exports = handler;
