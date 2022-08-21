/*
 * Title: Worker Libary
 * Description: Worker related file
 * Author: Satya Ranjon
 * Date : 21/08/2022
 */

// dependencies
const url = require("url");
const http = require("http");
const https = require("https");
const data = require("./data");
const { parseJSON } = require("../helpers/utiities");

//> worker object - module scaffolding
const worker = {};

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

//> validate  individual check data
worker.validateCheckData = (originalCheckData) => {
  if (originalCheckData && originalCheckData.id) {
    let originalData = originalCheckData;
    originalData.state =
      typeof originalCheckData.state === "string" &&
      ["up", "down"].indexOf(originalCheckData.state) > -1
        ? originalCheckData.state
        : "down";
    originalData.lastChecked =
      typeof originalCheckData.lastChecked === "number" &&
      originalCheckData.lastChecked > 0
        ? originalCheckData.lastChecked
        : false;

    // ? pass to the next process
    worker.performCheck(originalData);
  } else {
    console.log("Error: check was invalid or not properly formated");
  }
};

//> performChack data
worker.performCheck = (originalData) => {
  //? prapare the initial check outcome
  let checkOutCome = {
    error: false,
    responseCode: false,
    value: "",
  };

  //? mark the outcome has not been sent yet
  let outComeSent = false;

  //? parse the hostname & full url from original data
  const parseUrl = url.parse(
    originalData.protocol + "://" + originalData.url,
    true
  );
  const hostName = parseUrl.hostname;
  const path = parseUrl.path;

  // ? construct the request
  const requestDetails = {
    protocol: originalData.protocol + ":",
    hostname: hostName,
    method: originalData.method.toUpperCase(),
    path: path,
    timeoutSecounds: originalData.timeoutSecounds * 1000,
  };

  //? request the check url
  const protocalToUse = originalData.protocol === "http" ? http : https;

  let req = protocalToUse.request(requestDetails, (res) => {
    //? grab the status of the responses
    const status = res.statusCode;

    //? update the check outcome and pass to the next process
    checkOutCome.responseCode = status;
    if (!outComeSent) {
      //? process check out come
      worker.processCheckOutCome(originalData, checkOutCome);
      outComeSent = true;
    }
  });

  //? request error
  req.on("error", (err) => {
    //? prapare the initial check outcome
    let checkOutCome = {
      error: true,
      value: err,
    };

    //? update the check outcome and pass to the next process
    if (!outComeSent) {
      //? process check out come
      worker.processCheckOutCome(originalData, checkOutCome);
      outComeSent = true;
    }
  });

  //? request time out come
  req.on("timeout", (err) => {
    //? prapare the initial check outcome
    let checkOutCome = {
      error: true,
      value: "Time out",
    };

    //? update the check outcome and pass to the next process
    if (!outComeSent) {
      //? process check out come
      worker.processCheckOutCome(originalData, checkOutCome);
      outComeSent = true;
    }
  });

  //? req end
  req.end();
};

//> processCheckOutCome
worker.processCheckOutCome = (originalData, checkOutCome) => {
  //? check out come is up or down
  const state =
    !checkOutCome.error &&
    checkOutCome.responseCode &&
    originalData.succcessCodes.indexOf(checkOutCome.responseCode) > -1
      ? "up"
      : "down";
  //? decide whether we should alart the user or not
  const alertWanted =
    originalData.lastChecked && originalData.state !== state ? true : false;

  //? update the check data
  let newCheckData = originalData;
  newCheckData.state = state;
  newCheckData.lastChecked = Date.now();

  //? update the check to disk
  data.update("checks", newCheckData.id, newCheckData, (err) => {
    if (!err) {
      if (alertWanted) {
        // send the checkdata to next process
        worker.alertUserToStatusChange(newCheckData);
      } else {
        console.log("Not status change ");
      }
    } else {
      console.log("Error: trying to save check data of one of the checks !");
    }
  });
};

//> send notification sms to user if state changes
worker.alertUserToStatusChange = (newCheckData) => {
  let msg = `Alert: Your check for ${newCheckData.method.toUpperCase()} ${
    newCheckData.protocol
  }`;
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
