const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Schema
const StudentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  category: {
    type: String,
    default: "Student"
  },
  handle: {
    type: String,
    required: true,
    max: 40
  },
  company: {
    type: String
  },
  portfolio: {
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
  recomendation: [],
  sentRequest: [
    {
      mentorId: { type: Schema.Types.ObjectId, ref: "mentor" },
      mentorName: { type: String, default: "" },
      profilePic: { type: String, default: "" },
      userId: { type: String, default: "" }

    }
  ],
  friendsList: [
    {
      friendId: { type: Schema.Types.ObjectId, ref: "mentor" },
      friendName: { type: String, default: "" },
      profilePic: { type: String, default: "" },
      userId: { type: String, default: "" }

    }
  ],
  bio: {
    type: String
  },
  githubusername: {
    type: String
  },
  // posts: [],
  internships: [
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
  education: [
    {
      school: {
        type: String,
        required: true
      },
      degree: {
        type: String,
        required: true
      },
      fieldofstudy: {
        type: String,
        required: true
      },
      from: {
        type: Date,
        required: true
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

module.exports = mongoose.model("student", StudentSchema);
