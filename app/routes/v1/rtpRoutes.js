const { rtpController } = require("../../controllers");
const { USER_ROLES } = require("../../utils/constants");
const { Joi } = require("../../utils/joiUtils");

module.exports = [
    {
        method: "POST",
        path: "/globalRtp",
        auth: true,
        roleAccess: [USER_ROLES.ADMIN],
        joiSchemaForSwagger: {
            group: "Global rtp",
            description: "Route for setting the global RTP.",
            model: "globalRtp",

            body: {
                rtpPercentage: Joi.string().optional(),
            },
        },
        handler: rtpController.setGlobalRtp,
    },
    {
        method: "POST",
        path: "/userRtp",
        auth: true,
        roleAccess: [USER_ROLES.ADMIN],
        joiSchemaForSwagger: {
            group: "rtp",
            description: "Route for setting the rtp of user.",
            model: "rtp",

            query: {
                usersId: Joi.string().optional(),
            },
            body: {
                rtpPercentage: Joi.string().optional(),
            },
        },
        handler: rtpController.setUserRtp,
    },
];
