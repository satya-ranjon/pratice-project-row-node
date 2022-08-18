/*
 * Title: Environment
 * Description: Handle all environment varibale
 * Author: Satya Ranjon
 * Date : 17/08/2022
 */

// dependencies

// module scaffolding
const environments = {};

// staging environment
environments.staging = {
  port: 3000,
  envName: "staging",
};

// production environment
environments.production = {
  port: 5000,
  envName: "production",
};

// determine which environment was passed
// const currentEnvironment =
//   typeof process.env.NODE_ENV === "string" ? process.env.NODE_ENV : "staging";
const x = process.env.NODE_ENV;
const currentEnvironment =
  x === "production" ? environments.production : environments.staging;

// export corres ponding environment object
const environmentToExport = currentEnvironment;

console.log(typeof process.env.NODE_ENV);
console.log(environmentToExport);
// export module
module.exports = currentEnvironment;
