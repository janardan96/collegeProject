const Validator = require("validator");
const _ = require("lodash");

module.exports = reqValidate = (data) => {
  let errors = {};
  data.id = !_.isEmpty(data.id) ? data.id : "";

  if (Validator.isEmpty(data.id)) {
    errors.id = "Profile Id is required";
  }

  return {
    errors,
    isValid: _.isEmpty(errors)
  };
};
