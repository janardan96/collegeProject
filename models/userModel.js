const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    profilePic: {
      type: String,
      default: "https://previews.123rf.com/images/triken/triken1608/triken160800029/61320775-male-avatar-profile-picture-default-user-avatar-guest-avatar-simply-human-head-vector-illustration-i.jpg"
    },
    mobile: {
      type: String,
      required: true,
      unique: true
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    posts: [],
    recieveRequest: [
      {
        userId: { type: Schema.Types.ObjectId, ref: "users" },
        userName: { type: String, default: "" }
      }
    ],
    sentRequest: [
      {
        userId: { type: Schema.Types.ObjectId, ref: "users" },
        userName: { type: String, default: "" }
      }
    ],
    friendsList: [
      {
        friendId: { type: Schema.Types.ObjectId, ref: "users" },
        friendName: { type: String, default: "" }
      }
    ],
    totalRequest: { type: Number, default: 0 }
  },
  { timestamps: true }
);

module.exports = mongoose.model("users", UserSchema);
