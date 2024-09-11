'use strict';

/** ******************************
 **** Managing all the services ***
 ********* independently ********
 ******************************* */
module.exports = {
    dbService: require('./dbService'),
    swaggerService: require('./swaggerService'),
    authService: require('./authService'),
    fileUploadService: require('./fileUploadService'),
    userService: require("./userService"),
    otpService: require("./otpService"),
    symbolsService: require("./symbolsService")
    // stripeService: require('./stripeService'),
};
