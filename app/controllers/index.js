"use strict";

/** ******************************
 * Managing all the controllers *
 ********* independently ********
 ******************************* */

module.exports = {
  serverController: require("./serverController"),
  userController: require("./userController"),
  otpController: require("./otpController"),
  symbolsController: require("./symbolsController")
};
