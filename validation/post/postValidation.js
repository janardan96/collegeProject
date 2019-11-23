const Validator = require("validator");
const _ = require("lodash");

module.exports = function validatePostInput(data) {
  let errors = {};

  data.text = !_.isEmpty(data.text) ? data.text : "";

  if (Validator.isEmpty(data.text)) {
    errors.text = "Text Field is empty";
  }

  return {
    errors,
    isValid: _.isEmpty(errors)
  };
};
