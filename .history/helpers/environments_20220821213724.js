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
  secretKey: "sfsklfldskasalfdsl",
  maxChecks: 5,
  twilio: {
    fromPhone: "",
    accountSid: "AC55525e5ae5a72feabbb37fffbb85cd9b",
    autToken: "4bfd5f326dc622b92f62b849c717f1b6",
  },
};

// production environment
environments.production = {
  port: 5000,
  envName: "production",
  secretKey: "aasdfsfeskasalfdsl",
  maxChecks: 5,
  twilio: {
    fromPhone: "",
  },
};

// determine which environment was passed
const currentEnvironment =
  typeof process.env.NODE_ENV === "string" ? process.env.NODE_ENV : "staging";

// export corresponding environment object
const environmentToExport =
  typeof environments[currentEnvironment] === "object"
    ? environments[currentEnvironment]
    : environments.staging;

// export module
module.exports = environmentToExport;
