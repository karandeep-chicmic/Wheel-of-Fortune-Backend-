"use strict";

/** ******************************
 ********* Import All routes ***********
 ******************************* */
const v1Routes = [
  ...require("./serverRoutes"),
  ...require("./userRoutes"),
  ...require("./otpRoutes"),
  ...require("./symbolRoutes"),
  ...require("./fileUploadRoutes")
];

module.exports = v1Routes;
