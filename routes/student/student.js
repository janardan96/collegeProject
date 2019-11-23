const express = require("express");
const router = express.Router();
const Student = require("../../controller/student");
const passport = require("passport");

router.get(
  "/test",
  passport.authenticate("jwt", {
    session: false
  }),
  Student.test
);

router.get(
  "/profile",
  passport.authenticate("jwt", {
    session: false
  }),
  Student.profile
);

router.post(
  "/profile",
  passport.authenticate("jwt", {
    session: false
  }),
  Student.createProfile
);

router.get("/profile/all", Student.getAllProfile);

router.get("/handle/:handle", Student.getHandle);

router.get("/user/:userId", Student.getUserId);

// Experince
router.post(
  "/internships",
  passport.authenticate("jwt", {
    session: false
  }),
  Student.internship
);
router.delete(
  "/internships/:intern_id",
  passport.authenticate("jwt", {
    session: false
  }),
  Student.deleteInternship
);

// Education
router.post(
  "/education",
  passport.authenticate("jwt", {
    session: false
  }),
  Student.education
);
router.delete(
  "/education/:edu_id",
  passport.authenticate("jwt", {
    session: false
  }),
  Student.deleteEducation
);

// delete whole profile
router.delete(
  "/profile",
  passport.authenticate("jwt", {
    session: false
  }),
  Student.deleteProfile
);

module.exports = router;
