/*
 * Title: Uptime Monitoring Application
 * Description: A RESTFul API to moitor up or down time of user defined links
 * Author: Satya Ranjon
 * Date : 5/08/2022
 */

// dependencies

const server = require("./lib/server");
const workers = require("./lib/worker");

// --> remove later
const { sendTwilioSms } = require("./helpers/notifications");
sendTwilioSms("01735293504", "Hello world", (err) => {
  console.log(err);
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
