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
console.log(process.env.NODE_ENV);

const currentEnvironment =
  typeof process.env.NODE_ENV === "string"
    ? process.env.NODE_ENV === "production"
      ? "production"
      : "staging"
    : "staging";

// export corresponding environment object
// const environmentToExport =
//   typeof environments[currentEnvironment] === "object"
//     ? environments[currentEnvironment]
//     : environments.staging;

const environmentToExport = process.env.NODE_ENV;

// export module
module.exports = environmentToExport;
