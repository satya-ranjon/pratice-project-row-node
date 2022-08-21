/*
 * Title: Worker Libary
 * Description: Worker object file
 * Author: Satya Ranjon
 * Date : 5/08/2022
 */

const server = require("./server");

// dependencies
//> worker object - module scaffolding
const worker = {};

//> start the workers
worker.init = () => {
  console.log("worker");
};

// ? export the worker
module.exports = worker;
