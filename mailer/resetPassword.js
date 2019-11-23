const nodemailer = require("nodemailer");
const keys = require("../config/keys");
const sendgridTransport = require("nodemailer-sendgrid-transport");
const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: keys.sendgridApi
    }
  })
);

exports.forgotPassword = (user, link) => {
  transporter.sendMail({
    to: user,
    from: "studentMentor@node.com",
    subject: "Password reset",
    html: `<p>You are receiving this because you have requested the reset of password.Click the link for resetting the password <a href="${link}">${link}</p>`
  });
};
