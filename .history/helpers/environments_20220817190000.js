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
  port: 8000,
  envName: "staging",
};

// production environment
environments.production = {
  port: 5000,
  envName: "production ",
};

// determine which environment was passed
console.log(typeof process.env.NODE_ENV);
const currentEnvironment =
  process.env.NODE_ENV === "string" ? "production" : "staging";

// export corresponding environment object
const environmentToExport =
  environments[currentEnvironment] === "object"
    ? environments[currentEnvironment]
    : environments.staging;

// export module
module.exports = environmentToExport;
