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
const enviromments = require("./environments");

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
utilities.hash = (str) => {
  if (typeof str === "string" && str.length > 0) {
    const hash = crypto
      .createHmac("sha256", enviromments[process.env.NODE_ENV].secretKey)
      .update(str)
      .digest("hex");
    return hash;
  }
};
// export module
module.exports = utilities;
