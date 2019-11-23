const express = require("express");
const router = express.Router();
const Request = require("../../controller/friendRequest");
const passport = require("passport");

router.get("/", Request.test);
router.get(
  "/getRequestProfile",
  passport.authenticate("jwt", {
    session: false
  }),
  Request.senderProfile
);

router.post(
  "/sendRequest",
  passport.authenticate("jwt", {
    session: false
  }),
  Request.sendingRequest
);
router.post(
  "/acceptRequest",
  passport.authenticate("jwt", {
    session: false
  }),
  Request.acceptingRequest
);

router.post(
  "/cancelRequest",
  passport.authenticate("jwt", {
    session: false
  }),
  Request.cancelRequest
);

module.exports = router;
