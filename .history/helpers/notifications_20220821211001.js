/*
 * Title: Notifications Libary
 * Description: Important fuunction to notify users
 * Author: Satya Ranjon
 * Date : 21/08/2022
 */

// dependencies
const { https } = require("https");

// module scaffolding
const notifications = {};

// send sms to user using twilio api
notifications.sendTwilioSms = (phone, msg, callback) => {
  // input validations
  const userPhone =
    typeof phone === "string" && phone.trim().length === 11
      ? phone.trim()
      : false;
  const usrMsg =
    typeof msg === "string" &&
    msg.trim().length > 0 &&
    msg.trim().length <= 1600
      ? msg.trim()
      : false;
  if (userPhone && usrMsg) {
  } else {
    callback("Give parameters wre missing or invalid");
  }
};

// export to module
module.exports = notifications;
