const Validator = require("validator");
const _ = require("lodash");

module.exports = function validateForgotPassword(data) {
  let errors = {};

  data.password = !_.isEmpty(data.password) ? data.password : "";
  if (
    !Validator.isLength(data.password, {
      min: 6,
      max: 30
    })
  ) {
    errors.password = "Password must be atleast 6 character";
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password is required";
  }
  return {
    errors,
    isValid: _.isEmpty(errors)
  };
};
