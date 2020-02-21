const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Schema
const MentorSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  category: {
    type: String,
    default: "Mentor"
  },
  profiency: {
    type: String,
    required: true
  },
  company: {
    type: String
  },
  website: {
    type: String
  },
  location: {
    type: String
  },
  status: {
    type: String,
    required: true
  },
  skills: {
    type: [String],
    required: true
  },
  bio: {
    type: String
  },
  recieveRequest: [
    {
      studentId: { type: Schema.Types.ObjectId, ref: "student" },
      studentName: { type: String, default: "" },
      profilePic: { type: String, default: "" },
      userId: { type: String, default: "" }

    }
  ],
  friendsList: [
    {
      friendId: { type: Schema.Types.ObjectId, ref: "student" },
      friendName: { type: String, default: "" },
      profilePic: { type: String, default: "" },
      userId: { type: String, default: "" }
    }
  ],
  githubusername: {
    type: String
  },
  totalRequest: { type: Number, default: 0 },
  review: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users"
      },
      stars: {
        type: Number
      }
    }
  ],
  experience: [
    {
      title: {
        type: String
      },
      company: {
        type: String
      },
      location: {
        type: String
      },
      from: {
        type: Date
      },
      to: {
        type: Date
      },
      current: {
        type: Boolean,
        default: false
      },
      description: {
        type: String
      }
    }
  ],
  social: {
    youtube: {
      type: String
    },
    twitter: {
      type: String
    },
    facebook: {
      type: String
    },
    linkedin: {
      type: String
    },
    instagram: {
      type: String
    }
  },
  date: {
    type: String,
    default: Date.now
  }
});

module.exports = mongoose.model("mentor", MentorSchema);
