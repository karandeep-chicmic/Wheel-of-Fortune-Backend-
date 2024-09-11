const { symbolsController } = require("../../controllers");
const { Joi } = require("../../utils/joiUtils");

module.exports = [
  {
    method: "POST",
    path: "/symbol",
    auth: true,
    roleAccess: [1],
    joiSchemaForSwagger: {
      group: "SYMBOLS",
      description: "Route for creating a symbol.",
      model: "symbols",

      body: {
        name: Joi.string().min(8).max(20).lowercase().required(),
        symbolsType: Joi.number().min(0).max(30).required(),
        image: Joi.string().required(),
        description: Joi.string().min(10).max(200).lowercase().required(),
        amountPayout: Joi.number().required(),
        probability: Joi.number().required(),
      },
    },
    handler: symbolsController.createSymbol,
  },
  {
    method: "PUT",
    path: "/symbol",
    roleAccess: [1],
    auth: true,
    // adminAuth: true,
    joiSchemaForSwagger: {
      group: "SYMBOLS",
      description: "Route for updating a symbol.",
      model: "symbols",

      query: {
        id: Joi.string().required(),
      },
      body: {
        name: Joi.string().min(8).max(20).lowercase().required(),
        symbolsType: Joi.number().min(0).max(30).required(),
        image: Joi.string().required(),
        description: Joi.string().min(10).max(200).lowercase().required(),
        amountPayout: Joi.number().required(),
        probability: Joi.number().required(),
      },
    },
    handler: symbolsController.updateSymbol,
  },
  {
    method: "DELETE",
    path: "/symbol/:id",
    roleAccess: [1],
    auth: true,
    joiSchemaForSwagger: {
      group: "SYMBOLS",
      description: "Route for Deleting a symbol.",
      model: "symbols",

      params: {
        id: Joi.string().required(),
      },
    },
    handler: symbolsController.deleteSymbol,
  },
  {
    method: "GET",
    path: "/symbol",
    roleAccess: [1],
    auth: true,
    joiSchemaForSwagger: {
      group: "SYMBOLS",
      description: "Route for getting a symbol.",
      model: "symbols",

      query: {
        id: Joi.string().required(),
      },
    },
    handler: symbolsController.updateSymbol,
  },
];
