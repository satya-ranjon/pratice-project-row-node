/*
 * Title: Utilities
 * Description: Importent Utilities functions
 * Author: Satya Ranjon
 * Date : 18/08/2022
 */

// dependencies

// -->: module scaffolding
const utilities = {};

// -->: parse JSON string to Object
utilities.parseJSON = (jsonString) => {
  let output = {};
  try {
    output = JSON.parse(jsonString);
  } catch {
    output = {};
  }
};
// export module
module.exports = utilities;
