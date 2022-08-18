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
lib.basedir = path.join(__dirname, "/../data");

// write data to file
lib.create = function (dir, file, data, callback) {
  // open file for writing
  fs.open(lib.basedir + dir + "/" + file + ".json");
};
