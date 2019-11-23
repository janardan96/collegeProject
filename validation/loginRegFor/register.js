const Validator = require("validator");
const _ = require("lodash");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.name = !_.isEmpty(data.name) ? data.name : "";
  data.email = !_.isEmpty(data.email) ? data.email : "";
  data.mobile = !_.isEmpty(data.mobile) ? data.mobile : "";
  data.password = !_.isEmpty(data.password) ? data.password : "";

  if (
    !Validator.isLength(data.name, {
      min: 2,
      max: 30
    })
  ) {
    errors.name = "Name must be between 2 and 30 characters";
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = "Name Field is required";
  }
  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email Field is required";
  }

  if (!Validator.isMobilePhone(data.mobile, "any")) {
    errors.mobile = "Invalid mobile no.";
  }

  if (Validator.isEmpty(data.mobile)) {
    errors.mobile = "Mobile no. is required";
  }
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
