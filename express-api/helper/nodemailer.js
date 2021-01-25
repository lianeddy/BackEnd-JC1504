const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "lian.eddy@gmail.com",
    pass: "uzkqufzxkjxoupli",
  },
});

module.exports = transporter;
