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
      const mentor = await Mentor.findById(req.body.id).populate("user", ["name", "email", "profilePic"]).catch((err) =>
        res.status(404).json({ notFound: "User not found" })
      );
      const student = await studentProfile.findById(req.body.studentId).populate("user", ["name", "email", "profilePic"]).catch((err) => {
        res.status(404).json({ notFound: "Student not found" })
      })
      const recieverUser = await Mentor.updateOne(
        {
          _id: req.body.id,
          "recieveRequest.studentId": { $ne: student._id },
          "friendsList.friendId": { $ne: student._id }
        },
        {
          $push: {
            recieveRequest: { studentId: student._id, studentName: student.user.name, profilePic: student.user.profilePic, userId: student.user._id }
          },
          $inc: { totalRequest: 1 }
        }
      );
      const senderUser = await studentProfile.updateOne(
        { _id: student.id, "sentRequest.mentorId": { $ne: req.body.id } },
        {
          $push: {
            sentRequest: { mentorId: req.body.id, mentorName: mentor.user.name, profilePic: mentor.user.profilePic, userId: mentor.user._id }
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
    const senderProfile = await Mentor.findById(req.params.id).populate(
      "recieveRequest.studentId"
    );
    res.json(senderProfile.recieveRequest);
  } catch (error) {
    res.status(400).json({ notFound: "User not found" });
  }
};

exports.acceptingRequest = async (req, res) => {
  try {
    if (req.body.studentId) {
      const student = await studentProfile.findById(req.body.studentId).populate("user", ["name", "email", "profilePic"]).catch((err) =>
        res.status(404).json({ notFound: "User not found" })
      );
      const mentor = await Mentor.findById(req.body.id).populate("user", ["name", "email", "profilePic"]).catch((err) =>
        res.status(404).json({ notFound: "User not found" })
      );
      const recieverUser = await Mentor.updateOne(
        {
          _id: req.body.id,
          "friendsList.friendId": { $ne: req.body.studentId }
        },
        {
          $push: {
            friendsList: { friendId: student._id, friendName: student.user.name, profilePic: student.user.profilePic, userId: student.user._id }
          },
          $pull: {
            recieveRequest: { studentId: student._id, studentName: student.user.name, profilePic: student.user.profilePic, userId: student.user._id }
          },
          $inc: { totalRequest: -1 }
        }
      );

      const senderUser = await studentProfile.updateOne(
        { _id: student.id, "friendsList.friendId": { $ne: mentor.id } },
        {
          $push: {
            friendsList: { friendId: mentor._id, friendName: mentor.user.name, profilePic: mentor.user.profilePic, userId: mentor.user._id }
          },
          $pull: {
            sentRequest: { mentorId: mentor._id, mentorName: mentor.user.name, profilePic: mentor.user.profilePic, userId: mentor.user._id }
          }
        }
      );
      res.json({ success: senderUser });
    }
  } catch (error) {
    res.status(400).json({ badRequest: "Something is wrong" });
  }
};

exports.cancelRequest = async (req, res) => {
  try {
    if (req.body.senderId) {
      const student = await studentProfile.findById(req.body.studentId).populate("user", ["name", "email", "profilePic"]).catch((err) =>
        res.status(404).json({ notFound: "User not found" })
      );
      const mentor = await Mentor.findById(req.body.id).populate("user", ["name", "email", "profilePic"]).catch((err) =>
        res.status(404).json({ notFound: "User not found" })
      );
      const recieverUser = await Mentor.updateOne(
        {
          _id: mentor.id,
          "recieveRequest.studentId": { $eq: req.body.studentId }
        },
        {
          $pull: {
            recieveRequest: { studentId: student._id, studentName: student.user.name, profilePic: student.user.profilePic, userId: student.user._id }
          },
          $inc: { totalRequest: -1 }
        }
      );

      const senderUser = await studentProfile.updateOne(
        { _id: student.id, "sentRequest.mentorId": { $eq: mentor._id } },
        {
          $pull: {
            sentRequest: { mentorId: mentor._id, mentorName: mentor.user.name, profilePic: mentor.user.profilePic, userId: mentor.user._id }
          }
        }
      );
      res.json({ success: true });
    }
  } catch (error) {
    res.status(400).json({ badRequest: "Something is wrong" });
  }
};
