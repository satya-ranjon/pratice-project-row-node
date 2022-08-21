/*
 * Title: Notifications Libary
 * Description: Important fuunction to notify users
 * Author: Satya Ranjon
 * Date : 21/08/2022
 */

// dependencies
const { https } = require("https");
const { twilio } = require("./environments");

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
    const stringifyPayload = JSON.stringify(payload);
    // * configer the request deteils
    const requestDetils = {
      hostname: "api.twilio.com",
      method: "POST",
      path: `/2010-04-01/Accounts/${twilio.accountSid}/Messages.json`,
      auth: `${twilio.accountSid} :${twilio.auth}`,
      headers: {
        "Content-Type": "application/x-www-from-urlecded",
      },
    };
    // > instantiate the request object
    https.request(requestDetils, (res) => {
      // > get the status  of the send request
      const status = res.statusCode;
      // > callback successfully if the request went through
      if (status == 200 || status === 201) {
        callback(false);
      } else {
        callback("Status code returned was " + status);
      }
    });
  } else {
    callback("Give parameters wre missing or invalid");
  }
};

// export to module
module.exports = notifications;
