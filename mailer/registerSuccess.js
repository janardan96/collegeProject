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

exports.regSuccessfully = (user) => {
  transporter.sendMail({
    to: user,
    from: "studentMentor@node.com",
    subject: "SignUp succeeded",
    html: `<p>You successfully signed up</p>`
  });
};
