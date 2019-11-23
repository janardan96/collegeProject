const Validator = require("validator");
const _ = require("lodash");

module.exports = function validateEducationInput(data) {
  let errors = {};

  data.school = !_.isEmpty(data.school) ? data.school : "";
  data.degree = !_.isEmpty(data.degree) ? data.degree : "";
  data.fieldofstudy = !_.isEmpty(data.fieldofstudy) ? data.fieldofstudy : "";
  data.from = !_.isEmpty(data.from) ? data.from : "";

  if (Validator.isEmpty(data.school)) {
    errors.school = "School Field is required";
  }

  if (Validator.isEmpty(data.degree)) {
    errors.degree = "Degree Field is required";
  }

  if (Validator.isEmpty(data.fieldofstudy)) {
    errors.studyField = "Study Field is required";
  }
  if (Validator.isEmpty(data.from)) {
    errors.dateField = "From Date Field is required";
  }

  return {
    errors,
    isValid: _.isEmpty(errors)
  };
};
