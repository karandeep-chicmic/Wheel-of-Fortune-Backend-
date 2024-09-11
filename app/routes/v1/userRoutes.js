const { userController } = require("../../controllers");
const { EMAIL_REGEX } = require("../../utils/constants");
const { Joi } = require("../../utils/joiUtils");

module.exports = [
  {
    method: "POST",
    path: "/user/register",
    joiSchemaForSwagger: {
      group: "USERS",
      description: "Route for registering a user.",
      model: "users",
      formData: {
        file: {
          file: 1,
        },
        body: {
          username: Joi.string().required(),
          name: Joi.string().required(),
          email: Joi.string().required().regex(EMAIL_REGEX),
          password: Joi.string().min(8).required(),
        },
      },
    },
    handler: userController.registerUser,
  },
  {
    method: "POST",
    path: "/user/login",
    joiSchemaForSwagger: {
      group: "USERS",
      description: "Route for login for a user.",
      model: "users",
      body: {
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required(),
      },
    },
    handler: userController.loginUser,
  },
];
