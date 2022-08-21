/*
 * Title: Notifications Libary
 * Description: Important fuunction to notify users
 * Author: Satya Ranjon
 * Date : 21/08/2022
 */

// dependencies
const { https } = require("https");
const { twilio } = require("./environments");
const querystring = require("querystring");
// module scaffolding
const notifications = {};

// send sms to user using twilio api
notifications.sendTwilioSms = (phone, msg, callback) => {
  // input validations
  const userPhone =
    typeof phone === "string" && phone.trim().length === 11
      ? phone.trim()
      : false;
  const userMsg =
    typeof msg === "string" &&
    msg.trim().length > 0 &&
    msg.trim().length <= 1600
      ? msg.trim()
      : false;
  if (userPhone && userMsg) {
    //> configer the request payload
    const payload = {
      From: twilio.fromPhone,
      To: `+88${userPhone}`,
      Body: userMsg,
    };
    // ? stringigy the payload
    const stringifyPayload = que;
  } else {
    callback("Give parameters wre missing or invalid");
  }
};

// export to module
module.exports = notifications;
