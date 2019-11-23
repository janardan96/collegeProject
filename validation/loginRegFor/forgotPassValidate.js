const Validator = require("validator");
const _ = require("lodash");

module.exports = function validateForgotPassword(data) {
  let errors = {};

  data.email = !_.isEmpty(data.email) ? data.email : "";

  if (!Validator.isEmail(data.email)) {
    errors.email = "Invalid Email Id";
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email Field is required";
  }
  return {
    errors,
    isValid: _.isEmpty(errors)
  };
};
