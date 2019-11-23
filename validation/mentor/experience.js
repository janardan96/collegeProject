const Validator = require("validator");
const _ = require("lodash");

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.title = !_.isEmpty(data.title) ? data.title : "";
  data.company = !_.isEmpty(data.company) ? data.company : "";
  data.from = !_.isEmpty(data.from) ? data.from : "";

  if (Validator.isEmpty(data.title)) {
    errors.title = "Title Field is required";
  }

  if (Validator.isEmpty(data.company)) {
    errors.company = "Company Field is required";
  }

  if (Validator.isEmpty(data.from)) {
    errors.from = "From date Field is required";
  }

  return {
    errors,
    isValid: _.isEmpty(errors)
  };
};
