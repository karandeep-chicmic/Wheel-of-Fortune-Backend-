"use strict";

/** ******************************
 ********* Import All routes ***********
 ******************************* */
const v1Routes = [
  ...require("./serverRoutes"),
  ...require("./userRoutes"),
  ...require("./otpRoutes"),
  ...require("./symbolRoutes"),
];

module.exports = v1Routes;
