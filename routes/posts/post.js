const express = require("express");
const router = express.Router();
const Post = require("../../controller/posts");
const passport = require("passport");
const uploadFiles = require("../../uploadImage/multer");
require("../../uploadImage/cloudinary");

router.get("/", Post.getAll);

router.get("/:id", Post.getPostId);

router.post(
  "/",
  passport.authenticate("jwt", {
    session: false
  }),
  uploadFiles.single("post"),
  Post.createPost
);

router.delete(
  "/:id",
  passport.authenticate("jwt", {
    session: false
  }),
  Post.deletePost
);

router.post(
  "/like/:id",
  passport.authenticate("jwt", {
    session: false
  }),
  Post.like
);

router.get(
  "/like/users/:id",
  passport.authenticate("jwt", {
    session: false
  }),
  Post.getAllLikes
);

router.post(
  "/comment/:id",
  passport.authenticate("jwt", {
    session: false
  }),
  Post.postComment
);

router.delete(
  "/comment/:id/:comment_id",
  passport.authenticate("jwt", {
    session: false
  }),
  Post.deleteComment
);
module.exports = router;
