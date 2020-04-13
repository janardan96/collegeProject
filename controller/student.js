const studentProfile = require("../models/student");
const mentorProfile = require("../models/mentor");
const User = require("../models/userModel");

// validation
const studentProfileValidation = require("../validation/student/studentProfile");
const studentInternshipValidation = require("../validation/student/internshipValidate");
const studentEducationValidation = require("../validation/student/eductionValidation");

// Recomendation
const ContentBasedRecommender = require('content-based-recommender')
const recommender = new ContentBasedRecommender({
  minScore: 0.1,
  maxSimilarDocuments: 100
});

exports.test = (req, res) => {
  res.json({ success: "Success" });
};

exports.profile = async (req, res) => {
  const errrors = {};
  try {
    const profile = await studentProfile
      .findOne({ user: req.user.id })
      .populate("user", ["name", "email", "profilePic"]);
    if (!profile) {
      errrors.noProfile = "There is no profile for this user";
      return res.json(errrors);
    }
    res.json(profile);
  } catch (error) {
    res.status(400).json({ badRequest: "Something is wrong" });
  }
};

exports.createProfile = async (req, res) => {
  const { errors, isValid } = studentProfileValidation(req.body);
  // check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  //Get Fields
  const profileFields = {};
  profileFields.user = req.user.id;
  if (req.body.handle) profileFields.handle = req.body.handle;
  if (req.body.company) profileFields.company = req.body.company;
  if (req.body.website) profileFields.portfolio = req.body.portfolio;
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
    const profile = await studentProfile.findOne({ user: req.user.id });
    if (profile) {
      // update
      const updateProfile = await studentProfile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        {
          new: true
        }
      );
      res.json(updateProfile);
    } else {
      //Check handle
      const profileHandle = await studentProfile.findOne({
        handle: req.user.handle
      });
      if (profileHandle) {
        errors.handle = "Handle already exists";
        return res.status(400).json(errors);
      }
      //   Saving Profile
      const profileSave = await new studentProfile(profileFields)
        .save()
        .catch((err) => `error in saving the data ${err}`);
      res.status(201).json(profileSave);
    }
  } catch (error) {
    res.status(400).json({ badRequest: "Something is wrong" });
  }
};

exports.getAllProfile = async (req, res) => {
  try {
    const errors = {};
    const profiles = await studentProfile
      .find()
      .populate("user", ["name", "email", "profilePic"]);
    if (!profiles) {
      errors.noprofile = "There are no profile";
      return res.status(404).json(errors);
    }
    res.json(profiles);
  } catch (error) {
    res.status(400).json({ badRequest: "Something is wrong" });
  }
};

exports.getHandle = async (req, res) => {
  try {
    const errors = {};
    const profile = await studentProfile
      .findOne({ handle: req.params.handle })
      .populate("user", ["name", "email", "profilePic"]);

    if (!profile) {
      errors.noProfile = "There is no profile";
      return res.status(404).json(errors);
    }

    res.status(200).json(profile);
  } catch (error) {
    res.status(400).json({ badRequest: "Something is wrong" });
  }
};

exports.getUserId = async (req, res) => {
  try {
    const errors = {};
    const user = await studentProfile
      .findOne({ user: req.params.userId })
      .populate("user", ["name", "email", "profilePic"]);
    if (!user) {
      errors.noUser = "There is no profile for this user";
      return res.status(404).json(errors);
    }
    res.json(user);
  } catch (error) {
    res.status(400).json({ badRequest: "Something is wrong" });
  }
};

// Experience
exports.internship = async (req, res) => {
  try {
    const { errors, isValid } = studentInternshipValidation(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const profile = await studentProfile.findOne({ user: req.user.id });
    const newExp = {
      title: req.body.title,
      company: req.body.company,
      location: req.body.location,
      from: req.body.from,
      to: req.body.to,
      current: req.body.current,
      description: req.body.description
    };
    profile.internships.unshift(newExp);

    const userInternship = await profile.save();
    res.status(201).json(userInternship);
  } catch (error) {
    res.status(400).json({ badRequest: "Something is wrong" });
  }
};

exports.deleteInternship = async (req, res) => {
  try {
    const errors = {};
    const profile = await studentProfile.findOne({ user: req.user.id });
    const deletingItem = profile.internships
      .map((item) => item.id)
      .indexOf(req.params.intern_id);

    if (deletingItem === -1) {
      errors.noInternship = "Wrong internship info";
      return res.status(404).json(errors);
    }
    profile.internships.splice(deletingItem, 1);
    const afterDelete = await profile.save();
    res.json(afterDelete);
  } catch (error) {
    res.status(400).json({ badRequest: "Something is wrong" });
  }
};

// Education
exports.education = async (req, res) => {
  try {
    const { errors, isValid } = studentEducationValidation(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }
    const profile = await studentProfile.findOne({ user: req.user.id });
    const newEdu = {
      school: req.body.school,
      degree: req.body.degree,
      fieldofstudy: req.body.fieldofstudy,
      from: req.body.from,
      to: req.body.to,
      current: req.body.current,
      description: req.body.description
    };
    profile.education.unshift(newEdu);
    const userEducation = await profile.save();
    res.status(201).json(userEducation);
  } catch (error) {
    res.status(400).json({ badRequest: "Something is wrong" });
  }
};

exports.deleteEducation = async (req, res) => {
  try {
    const errors = {};
    const profile = await studentProfile.findOne({ user: req.user.id });
    const deletingItem = profile.education
      .map((item) => item.id)
      .indexOf(req.params.edu_id);

    if (deletingItem === -1) {
      errors.noEducation = "Wrong education info";
      return res.status(404).json(errors);
    }
    profile.education.splice(deletingItem, 1);
    const afterDelete = await profile.save();
    res.json(afterDelete);
  } catch (error) {
    res.status(400).json({ badRequest: "Something is wrong" });
  }
};

exports.deleteProfile = async (req, res) => {
  try {
    await studentProfile.findOneAndRemove({
      user: req.user.id
    });
    await User.findByIdAndRemove(req.user.id);
    await mentorProfile.findByIdAndRemove(req.user.id)
    res.json({ success: "User deleted successfully" });
  } catch (error) {
    res.status(400).json({ badRequest: "Something is wrong" });
  }
};

exports.getRecommendation = async (req, res) => {
  try {
    const profile = await studentProfile.findOne({ user: req.user.id });
    const allMentor = await mentorProfile.find();
    const studentSkills = profile.skills.join(" ");
    const studentId = profile._id.toString();
    const mentorSkills = allMentor.map(el => {
      return {
        id: el._id.toString(),
        content: el.skills.join(" "),
        type: "Mentor"
      }
    });

    const allDataRecommendation = [...mentorSkills, { id: studentId, content: studentSkills, type: "Student" }]
    // start training
    recommender.train(allDataRecommendation);
    //get top 10 similar items to document 1000002
    const similarDocuments = recommender.getSimilarDocuments(studentId, 0, 2);
    res.status(200).json(similarDocuments)

  } catch (error) {
    res.status(400).json({ error: error })

  }
}