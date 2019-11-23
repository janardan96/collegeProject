const studentProfile = require("../models/student");
const User = require("../models/userModel");
const Mentor = require("../models/mentor");
const requestValidation = require("../validation/requsetValidation");

exports.test = (req, res) => {
  res.json({ success: "Success" });
};

exports.sendingRequest = async (req, res) => {
  try {
    const { errors, isValid } = requestValidation(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    if (req.body.id) {
      const recieveUser = await User.findById(req.body.id).catch((err) =>
        res.status(404).json({ notFound: "User not found" })
      );
      const recieverUser = await User.update(
        {
          _id: req.body.id,
          "recieveRequest.userId": { $ne: req.user.id },
          "friendsList.friendId": { $ne: req.user.id }
        },
        {
          $push: {
            recieveRequest: { userId: req.user.id, userName: req.user.name }
          },
          $inc: { totalRequest: 1 }
        }
      );
      const senderUser = await User.update(
        { _id: req.user.id, "sentRequest.userId": { $ne: req.body.id } },
        {
          $push: {
            sentRequest: { userId: recieveUser.id, userName: recieveUser.name }
          }
        }
      );
      res.json({ success: true });
    }
  } catch (error) {
    res.status(400).json({ badRequest: "Something is wrong" });
  }
};

exports.senderProfile = async (req, res) => {
  try {
    const senderProfile = await User.findById(req.user.id).populate(
      "recieveRequest.userId"
    );
    res.json(senderProfile.recieveRequest);
  } catch (error) {
    res.status(400).json({ notFound: "User not found" });
  }
};

exports.acceptingRequest = async (req, res) => {
  try {
    if (req.body.senderId) {
      const sender = await User.findById(req.body.senderId).catch((err) =>
        res.status(404).json({ notFound: "User not found" })
      );
      const recieverUser = await User.update(
        {
          _id: req.user.id,
          "friendsList.friendId": { $ne: req.body.senderId }
        },
        {
          $push: {
            friendsList: { friendId: sender.id, friendName: sender.name }
          },
          $pull: {
            recieveRequest: { userId: sender.id, userName: sender.name }
          },
          $inc: { totalRequest: -1 }
        }
      );

      const senderUser = await User.update(
        { _id: sender.id, "friendsList.friendId": { $ne: req.user.id } },
        {
          $push: {
            friendsList: { friendId: req.user.id, friendName: req.user.name }
          },
          $pull: {
            sentRequest: { userId: req.user.id, userName: req.user.name }
          }
        }
      );
      res.json({ success: true });
    }
  } catch (error) {
    res.status(400).json({ badRequest: "Something is wrong" });
  }
};

exports.cancelRequest = async (req, res) => {
  try {
    if (req.body.senderId) {
      const sender = await User.findById(req.body.senderId).catch((err) =>
        res.status(404).json({ notFound: "User not found" })
      );
      const recieverUser = await User.update(
        {
          _id: req.user.id,
          "recieveRequest.userId": { $eq: req.body.senderId }
        },
        {
          $pull: {
            recieveRequest: { userId: sender.id, userName: sender.name }
          },
          $inc: { totalRequest: -1 }
        }
      );

      const senderUser = await User.update(
        { _id: sender.id, "sentRequest.userId": { $eq: req.user.id } },
        {
          $pull: {
            sentRequest: { userId: req.user.id, userName: req.user.name }
          }
        }
      );
      res.json({ success: true });
    }
  } catch (error) {
    res.status(400).json({ badRequest: "Something is wrong" });
  }
};
