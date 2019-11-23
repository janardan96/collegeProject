const User = require("../models/userModel");
const Post = require("../models/post");
const cloudinary = require("cloudinary");

// validation
const validatePostInput = require("../validation/post/postValidation");

exports.getAll = async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.status(200).json(posts);
  } catch (error) {
    return res.status(400).json({ error: "Something is wrong!!" });
  }
};

exports.getPostId = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    return res.status(404).json({ post: "Post is not found" });
  }
};

exports.createPost = async (req, res) => {
  try {
    const { errors, isValid } = validatePostInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    var newPost = {};
    if (req.file) {
      //Upload image on Cloudinary
      const result = await cloudinary.v2.uploader.upload(req.file.path);
      newPost = new Post({
        text: req.body.text,
        name: req.user.name,
        profilePic: req.user.profilePic,
        user: req.user.id,
        imageUrl: result.secure_url,
        imageId: result.public_id
      });
    } else {
      newPost = new Post({
        text: req.body.text,
        name: req.user.name,
        profilePic: req.user.profilePic,
        user: req.user.id
      });
    }
    const post = await newPost.save();
    const user = await User.findById(req.user.id);
    // const users= await User.findOne({ user: req.user.id });
    user.posts.unshift(post);
    await user.save();
    res.status(201).json(post);
  } catch (error) {
    return res.status(400).json({ error: "Something is wrong!!" });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const post = await Post.findById(req.params.id);
    if (post.user.toString() === req.user.id) {
      if (post.imageId) {
        await cloudinary.v2.uploader.destroy(post.imageId);
      }
      await post.remove();
      //Delete from Profile Model
      const postFromUser = user.posts
        .map((item) => item.id)
        .indexOf(req.params.id);
      user.posts.splice(postFromUser, 1);
      await user.save();
      res.json({ success: true });
    } else {
      return res.status(404).json({ user: "Unauthorized User" });
    }
  } catch (error) {
    return res.status(404).json({ post: "Post is not found" });
  }
};

exports.like = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      //Get remove index
      const removeLike = post.likes
        .map((item) => item.user.toString())
        .indexOf(req.user.id);
      //Splice out of array
      post.likes.splice(removeLike, 1);
      const dislike = await post.save();
      res.status(200).json(dislike);
    } else {
      post.likes.unshift({
        user: req.user.id
      });
      const likes = await post.save();
      res.status(200).json(likes);
    }
  } catch (error) {
    return res.status(404).json({ post: "Post is not found" });
  }
};

exports.getAllLikes = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const userLikes = post.likes.map((like) => like.user);
    const allUsers = await User.find({ _id: userLikes });
    const allLikes = allUsers.map((like) => {
      return {
        name: like.name,
        profilePic: like.profilePic,
        id: like.id
      };
    });
    res.json(allLikes);
  } catch (error) {
    return res.status(404).json({ post: "Post is not found" });
  }
};

exports.postComment = async (req, res) => {
  try {
    const { errors, isValid } = validatePostInput(req.body);
    if (!isValid) {
      //if any error
      return res.status(400).json(errors);
    }
    const post = await Post.findById(req.params.id);
    const newComment = {
      text: req.body.text,
      name: req.user.name,
      profilePic: req.user.profilePic,
      user: req.user.id
    };
    post.comments.unshift(newComment);
    const saveComment = await post.save();
    res.status(200).json(saveComment);
  } catch (error) {
    return res.status(404).json({ post: "Post is not found" });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    //Getting index
    const removeIndex = post.comments
      .map((item) => item._id.toString())
      .indexOf(req.params.comment_id);

    if (
      post.user.toString() === req.user.id ||
      post.comments[removeIndex].user.toString() === req.user.id
    ) {
      if (
        post.comments.filter(
          (comments) => comments._id.toString() === req.params.comment_id
        ).length === 0
      ) {
        return res
          .status(404)
          .json({ commentnotexists: "Comment does not exist" });
      }
      post.comments.splice(removeIndex, 1);
      const removeComment = await post.save();
      res.json(removeComment);
    } else res.status(401).json({ unauthorized: "User is unauthorized" });
  } catch (error) {
    return res.status(404).json({ post: "Post is not found" });
  }
};
