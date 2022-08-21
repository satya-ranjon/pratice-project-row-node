/*
 * Title: Worker Libary
 * Description: Worker related file
 * Author: Satya Ranjon
 * Date : 21/08/2022
 */

// dependencies
const data = require("./data");
const { parseJSON } = require("../helpers/utiities");

//> worker object - module scaffolding
const worker = {};

//> validate  individual check data
worker.validateCheckData = (originalCheckData) => {
  if (originalCheckData && originalCheckData.id) {
    originalCheckData.state =
      typeof originalCheckData.state === "string" &&
      ["up", "down"].indexOf(originalCheckData.state) > -1
        ? originalCheckData.state
        : "down";
    originalCheckData.lastChecked =
      typeof originalCheckData.lastChecked === "string" &&
      ["up", "down"].indexOf(originalCheckData.state) > -1
        ? originalCheckData.state
        : "down";
  } else {
    console.log("Error: check was invalid or not properly formated");
  }
};

//> lookup all the check
worker.getherAllChecks = () => {
  // ? get all the checks
  data.list("checks", (err, checks) => {
    if (!err && checks && checks > 0) {
      checks.forEach((check) => {
        // ? read the checkData
        data.read("checks", check, (err, originalCheckData) => {
          if (!err && originalCheckData) {
            // ? pass the data to the checks validator
            worker.validateCheckData(parseJSON(originalCheckData));
          } else {
            console.log("Error: reading one of the check data !");
          }
        });
      });
    } else {
      console.log("Error: could not find  any checks to process");
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