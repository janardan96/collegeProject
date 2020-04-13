const studentProfile = require("../models/student");
const User = require("../models/userModel");
const Mentor = require("../models/mentor");

// Validation
const mentorValidation = require("../validation/mentor/mentorValidation");
const mentorExperienceValidation = require("../validation/mentor/experience");
const validator = require("validator");

exports.test = (req, res) => {
  res.json({ success: "Success" });
};

exports.profile = async (req, res) => {
  const errrors = {};
  try {
    const profile = await Mentor.findOne({ user: req.user.id }).populate(
      "user",
      ["name", "email", "profilePic"]
    );
    if (!profile) {
      errrors.noProfile = "There is no profile for this mentor";
      return res.json(errrors);
    }
    res.json(profile);
  } catch (error) {
    res.status(400).json({ badRequest: "Something is wrong" });
  }
};

exports.createProfile = async (req, res) => {
  const { errors, isValid } = mentorValidation(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  //Get Fields
  const profileFields = {};
  profileFields.user = req.user.id;
  if (req.body.profiency) profileFields.profiency = req.body.profiency;
  if (req.body.company) profileFields.company = req.body.company;
  if (req.body.website) profileFields.website = req.body.website;
  if (req.body.location) profileFields.location = req.body.location;
  if (req.body.bio) profileFields.bio = req.body.bio;
  if (req.body.status) profileFields.status = req.body.status;
  if (req.body.githubusername)
    profileFields.githubusername = req.body.githubusername;

  //Skills -Spilt into array
  if (typeof req.body.skills !== undefined) {
    profileFields.skills = req.body.skills.split(",");
  }

  //Social
  profileFields.social = {};
  if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
  if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
  if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
  if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
  if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

  try {
    const profile = await Mentor.findOne({ user: req.user.id });
    if (profile) {
      // update
      const updateProfile = await Mentor.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        {
          new: true
        }
      );
      res.status(200).json(updateProfile);
    } else {
      //   Saving Profile
      const profileSave = await new Mentor(profileFields).save();
      res.status(201).json(profileSave);
    }
  } catch (error) {
    res.status(404).json({ badRequest: "Something is wrong" });
  }
};

exports.getAllMentors = async (req, res) => {
  try {
    const errors = {};
    const profiles = await Mentor.find().populate("user", [
      "name",
      "email",
      "profilePic"
    ]);
    if (!profiles) {
      errors.noprofile = "There are no profile";
      return res.status(404).json(errors);
    }
    res.json(profiles);
  } catch (error) {
    res.status(400).json({ badRequest: "Something is wrong" });
  }
};

exports.getMentorId = async (req, res) => {
  try {
    const errors = {};
    const user = await Mentor.findOne({
      _id: req.params.mentorId
    }).populate("user", ["name", "email", "profilePic"]);


    if (!user) {
      errors.noUser = "There is no profile for this mentor";
      return res.status(404).json(errors);
    }
    res.json(user);
  } catch (error) {
    res.status(400).json({ badRequest: "Something is wrong" });
  }
};

// Experience
exports.experience = async (req, res) => {
  try {
    const { errors, isValid } = mentorExperienceValidation(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const profile = await Mentor.findOne({ user: req.user.id });
    const newExp = {
      title: req.body.title,
      company: req.body.company,
      location: req.body.location,
      from: req.body.from,
      to: req.body.to,
      current: req.body.current,
      description: req.body.description
    };
    profile.experience.unshift(newExp);

    const mentorExperience = await profile.save();
    res.status(201).json(mentorExperience);
  } catch (error) {
    res.status(400).json({ badRequest: "Something is wrong" });
  }
};

exports.deleteExperience = async (req, res) => {
  try {
    const errors = {};
    const profile = await Mentor.findOne({ user: req.user.id });
    const deletingItem = profile.experience
      .map((item) => item.id)
      .indexOf(req.params.experience_id);

    if (deletingItem === -1) {
      errors.noInternship = "Wrong internship info";
      return res.status(404).json(errors);
    }
    profile.experience.splice(deletingItem, 1);
    const afterDelete = await profile.save();
    res.json(afterDelete);
  } catch (error) {
    res.status(400).json({ badRequest: "Something is wrong" });
  }
};

exports.deleteProfile = async (req, res) => {
  try {
    await Mentor.findOneAndRemove({
      user: req.user.id
    });
    res.json({ success: "User deleted successfully" });
  } catch (error) {
    res.status(400).json({ badRequest: "Something is wrong" });
  }
};


exports.giveStar = async (req, res) => {
  try {
    if (req.body.star === undefined) {
      return res.status(400).json({ error: "Star is needed" })
    }
    const mentor = await Mentor.findOne({
      _id: req.params.mentorId
    });
    const user = await User.findById(req.user.id);

    await Mentor.updateOne(
      {
        _id: req.params.mentorId,
        "review.user": { $eq: user._id }
      },
      {
        $set: {
          review: {
            user: req.user.id,
            userName: req.user.name,
            stars: req.body.star
          }
        }
      }
    )
    await Mentor.updateOne(
      {
        _id: req.params.mentorId,
        "review.user": { $ne: user._id }
      },
      {
        $push: {
          review: {
            user: req.user.id,
            userName: req.user.name,
            stars: req.body.star
          }
        }
      }
    )
    // if (mentor.review.some(el => el.user.toString() === req.user.id.toString())) {
    //   const removeStar = mentor.review.map(el => el.user.toString()).indexOf(req.user.id);
    //   mentor.review.splice(removeStar, 1);
    // }

    await User.updateOne(
      {
        _id: req.user.id,
        "giveStars.mentorId": { $eq: mentor._id },
      },
      {
        $set: {
          giveStars: { mentorId: mentor._id, stars: req.body.star }
        },
      }
    );

    await User.updateOne(
      {
        _id: req.user.id,
        "giveStars.mentorId": { $ne: mentor._id },
      },
      {
        $push: {
          giveStars: { mentorId: mentor._id, stars: req.body.star }
        },
      }
    );

    // const newReview = {
    //   user: req.user.id,
    //   userName: req.user.name,
    //   stars: req.body.star
    // }
    // mentor.review.unshift(newReview);
    // const reviewMentor = await mentor.save();
    res.json({ success: "true" });
  } catch (error) {
    res.status(400).json({ badRequest: "Something is wrong" });
  }
}