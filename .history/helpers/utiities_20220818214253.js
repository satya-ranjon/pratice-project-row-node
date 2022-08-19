/*
 * Title: Utilities
 * Description: Importent Utilities functions
 * Author: Satya Ranjon
 * Date : 18/08/2022
 */

// dependencies
const crypto = require("crypto");
// -->: module scaffolding
const utilities = {};

// > parse JSON string to Object
utilities.parseJSON = (jsonString) => {
  let output = {};
  try {
    output = JSON.parse(jsonString);
  } catch {
    output = {};
  }
};

// > Hash string
utilities.hash = (str) => {};
// export module
module.exports = utilities;
