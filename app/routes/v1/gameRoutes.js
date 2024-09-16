const { Joi } = require("../../utils/joiUtils");
const { gameController } = require("../../controllers");
const { USER_ROLES } = require("../../utils/constants");

module.exports = [
  {
    method: "POST",
    path: "/spinTheWheel",
    auth: true,
    roleAccess: [USER_ROLES.ADMIN],
    joiSchemaForSwagger: {
      group: "GAME",
      description: "Route for Spining the wheel.",
      model: "Games",

      query: {
        wheelId: Joi.string().objectId().required(),
        userId:Joi.string().objectId().required(),
      },

      body: {
        betAmount: Joi.number().required() 
      }
    },
    handler: gameController.spinTheWheel,
  },
];
