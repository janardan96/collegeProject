const express = require("express");
const router = express.Router();
const User = require("../../controller/users");
const passport = require("passport");

router.get(
  "/test",
  passport.authenticate("jwt", {
    session: false
  }),
  User.test
);

router.post("/register", User.register);
router.post("/login", User.login);
router.post("/forgot", User.forgot);
router.get("/reset/:token", User.newPassword);
router.post("/reset/:token", User.setNewPassword);
// router.get(
//   "/aboutme",
//   passport.authenticate("jwt", {
//     session: false
//   }),
//   User.userInfo
// );

module.exports = router;
