/*
 * Title: Uptime Monitoring Application
 * Description: A RESTFul API to moitor up or down time of user defined links
 * Author: Satya Ranjon
 * Date : 5/08/2022
 */

// dependencies

const server = require("./lib/server");
const workers = require("./lib/worker");
const sendTwilioSms = require("./helpers/notifications");

sendTwilioSms("01911111111", "Hello world", (err) => {
  console.log(`this is the error`, err);
});

/// > app object - module scaffolding
const app = {};

app.init = () => {
  // ? start the server
  server.init();
  // ? start the workers
  workers.init();
};

app.init();

// export the app
module.exports = app;
