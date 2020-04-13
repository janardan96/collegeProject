const express = require("express");
const router = express.Router();
const Mentor = require("../../controller/mentor");
const passport = require("passport");

router.get("/", Mentor.test);
router.get(
  "/profile",
  passport.authenticate("jwt", {
    session: false
  }),
  Mentor.profile
);

router.post(
  "/profile",
  passport.authenticate("jwt", {
    session: false
  }),
  Mentor.createProfile
);

router.get("/profile/all", Mentor.getAllMentors);

router.get("/user/:mentorId", Mentor.getMentorId);

// Experince
router.post(
  "/experience",
  passport.authenticate("jwt", {
    session: false
  }),
  Mentor.experience
);
router.delete(
  "/experience/:experience_id",
  passport.authenticate("jwt", {
    session: false
  }),
  Mentor.deleteExperience
);

// delete mentor profile
router.delete(
  "/profile",
  passport.authenticate("jwt", {
    session: false
  }),
  Mentor.deleteProfile
);

// Star to mentor
router.post(
  "/star/:mentorId",
  passport.authenticate("jwt", {
    session: false
  }),
  Mentor.giveStar
);

module.exports = router;
