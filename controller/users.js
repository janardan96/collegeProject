// Load User model
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const regMail = require("../mailer/registerSuccess");
const forgot = require("../mailer/resetPassword");
const crypto = require("crypto");

// Validation
const validateLoginInput = require("../validation/loginRegFor/loginValidate");
const validateRegisterInput = require("../validation/loginRegFor/register");
const forgotPassValidate = require("../validation/loginRegFor/forgotPassValidate");
const newPassSet = require("../validation/loginRegFor/newPassSet");

exports.test = (req, res) => {
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email
  });
};

exports.getStar = async (req, res) => {
  try {
    const userReview = await User.findById(req.user.id);
    res.status(200).json(userReview.giveStars)
  } catch (error) {
    res.status(400).json({ Error: "Something Wrrong" })
  }
}

exports.register = async (req, res) => {
  try {
    const { errors, isValid } = validateRegisterInput(req.body);

    //Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const userEmail = await User.findOne({
      email: req.body.email
    });
    const userMobile = await User.findOne({
      mobile: req.body.mobile
    });

    if (userEmail) {
      return res.status(400).json({ email: "Email alredy exists" });
    } else if (userMobile) {
      return res.status(400).json({ mobile: "Mobile is registered" });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        mobile: req.body.mobile
      });

      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(newUser.password, salt);
      newUser.password = hashPassword;
      const regUser = await newUser.save();

      //Sign Token
      const payload = {
        id: regUser.id,
        name: regUser.name,
        profilePic: regUser.profilePic
      };
      //Generate Token
      const token = await jwt.sign(payload, keys.secretOrkey, {
        expiresIn: 604800
      });
      res.status(200).json({
        success: true,
        token: "Bearer " + token
      });

      //   Sending mail
      regMail.regSuccessfully(regUser.email);
    }
  } catch (error) {
    return res.status(400).json({ error: "Something is wrong!!" });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { errors, isValid } = validateLoginInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;
    const user = await User.findOne({ email });
    // checking for user
    if (!user) {
      errors.email = "User not found";
      return res.status(404).json(errors);
    }
    // Check Password
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      // User Match
      const payload = {
        id: user.id, name: user.name, profilePic: user.profilePic
      };
      //   Sign Token
      const token = await jwt.sign(payload, keys.secretOrkey, {
        expiresIn: 604800
      });
      res.json({
        success: true,
        token: "Bearer " + token
      });
    } else {
      errors.password = "Incorrect Password";
      return res.status(400).json(errors);
    }
  } catch (error) {
    return res.status(400).json({ error: "Something is wrong!!" });
  }
};

// Forgot Password
exports.forgot = async (req, res) => {
  try {
    const { errors, isValid } = forgotPassValidate(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const email = req.body.email;
    const success = {};
    const user = await User.findOne({ email });

    if (!user) {
      errors.email = "User not found";
      return res.status(404).json(errors);
    }
    // Generating random string for reset password
    crypto.randomBytes(12, async (err, buffer) => {
      const token = buffer.toString("hex");
      user.resetPasswordToken = token;
      user.resetPasswordExpires = Date.now() + 3600000; //1 hr
      await user.save();
      const link = `${req.protocol}://localhost:5000/reset/${token}`;
      forgot.forgotPassword(user.email, link);
      success.sended = `Link is sended successfully to ${email}`;
      return res.status(200).json({ success: success.sended });
    });
  } catch (error) {
    return res.status(400).json({ error: "Something is wrong!!" });
  }
};

exports.newPassword = async (req, res) => {
  try {
    const token = req.params.token;
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      errors = {};
      errors.email = "User not found";
      return res.status(404).json(errors);
    }
    res.status(200).json({
      user: user._id.toString(),
      passwordToken: token
    });
  } catch (error) {
    return res.status(400).json({ error: "Something is wrong!!" });
  }
};

exports.setNewPassword = async (req, res) => {
  try {
    const { errors, isValid } = newPassSet(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const newPassword = req.body.password;
    const userId = req.body.userId;
    const passwordToken = req.body.passwordToken;

    const user = await User.findOne({
      resetPasswordToken: passwordToken,
      _id: userId,
      resetPasswordExpires: { $gt: Date.now() }
    });
    if (!user) {
      return res.status(404).json({ user: "User not found" });
    }

    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(user.password, salt);
    user.password = hashPassword;
    await user.save();

    res.status(200).json({ success: "Password is updated successfully" });
  } catch (error) {
    return res.status(400).json({ error: "Something is wrong!!" });
  }
};

// exports.userInfo = async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id);
//     if (user._id.toString() === req.user.id) {
//       return res.status(200).json(user);
//     }
//     res.status(401).json({ unauthorized: "Unauthorized user" });
//   } catch (error) {
//     return res.status(400).json({ error: "Something is wrong!!" });
//   }
// };
