/*
 * Title: Utilities
 * Description: Importent Utilities functions
 * Author: Satya Ranjon
 * Date : 18/08/2022
 */

// dependencies
const crypto = require("crypto");
// ! module scaffolding
const utilities = {};
const enviromments = require("./environments");

// > parse JSON string to Object
utilities.parseJSON = (jsonString) => {
  let output;
  try {
    output = JSON.parse(jsonString);
  } catch {
    output = {};
  }
  return output;
};

// > Hash string
utilities.hash = (str) => {
  if (typeof str === "string" && str.length > 0) {
    const hash = crypto
      .createHmac("sha256", enviromments.secretKey)
      .update(str)
      .digest("hex");
    return hash;
  } else {
    return false;
  }
};
// > createRandom String string
utilities.createRandomString = (stringlength) => {
  const length = stringlength;
  length =
    typeof stringlength === "number" && stringlength > 0 ? stringlength : false;
  if (length) {
    const possiblecharecters = "abcdefghijklmnopqrstuvwx1234567890";
    let output = "";
    for (let i = 1; i <= length; i += 1) {
      const randomCharcter = possiblecharecters.charAt(
        Math.floor(Math.random() * possiblecharecters.length)
      );
      output += randomCharcter;
    }
  }
};
// export module
module.exports = utilities;
