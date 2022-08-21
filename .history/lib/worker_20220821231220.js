/*
 * Title: Worker Libary
 * Description: Worker related file
 * Author: Satya Ranjon
 * Date : 21/08/2022
 */

// dependencies
const data = require("./data");

//> worker object - module scaffolding
const worker = {};

//> lookup all the check
worker.getherAllChecks = () => {
  // ? get all the checks
  data.list("checks", (err, checks) => {
    if (!err && checks && checks > 0) {
    } else {
      console.log("Error: could not find  any checks");
    }
  });
};

//> timer to execute the worker process once per minute
worker.loop = () => {
  setInterval(() => {
    worker.getherAllChecks();
  }, 1000 * 60);
};

//> start the workers
worker.init = () => {
  //?  execcute all the checks
  worker.getherAllChecks();
  //? call the loop so that checks continue
  worker.loop();
};

// ? export the worker
module.exports = worker;
