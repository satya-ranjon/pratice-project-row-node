/*
 * Title: Worker Libary
 * Description: Worker related file
 * Author: Satya Ranjon
 * Date : 21/08/2022
 */

const server = require("./server");

// dependencies
//> worker object - module scaffolding
const worker = {};
//> timer to execute the worker process once per minute
worker.loop = () => {
  setInterval(() => {}, 1000 * 60);
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
