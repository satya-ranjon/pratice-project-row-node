/*
 * Title: Data
 * Description: Handle all Data
 * Author: Satya Ranjon
 * Date : 17/08/2022
 */

// dependencies
const fs = require("fs");
const path = require("path");

const lib = {};

// base directory of the data folder
lib.basedir = path.join(__dirname, "../.data/");

// write data to file
lib.create = function (dir, file, data, callback) {
  // open file for writing
  fs.open(
    lib.basedir + dir + "/" + file + ".json",
    "wx",
    function (err, fileDescriptor) {
      if (!err && fileDescriptor) {
        // convert data to string
        const stringData = JSON.stringify(data);
        // write data to file and then close it
        fs.writeFile(fileDescriptor, stringData, function (err) {
          if (!err) {
            fs.close(fileDescriptor, function (err) {
              if (!err) {
                callback(false);
              } else {
                callback("Error closing the new file ");
              }
            });
          } else {
            callback("Error writing to new file");
          }
        });
      } else {
        callback("There was an error, file may already exists!");
      }
    }
  );
};

// read data from file
lib.read = (dir, file, callback) => {
  fs.readFile(lib.basedir + dir + "/" + file + ".json", "utf8", (err, data) => {
    callback(err, data);
  });
};

// update existing file
lib.update = (dir, file, data, callback) => {
  fs.open(
    lib.basedir + dir + "/" + file + ".json",
    "r+",
    (err, fileDescriptor) => {
      if (!err && fileDescriptor) {
        // convert the data to string
        const stringData = JSON.stringify(data);
      } else {
        console.log("Error updating file may not exist");
      }
    }
  );
};

module.exports = lib;
