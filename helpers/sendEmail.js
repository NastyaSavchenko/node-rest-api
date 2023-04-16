const nodemailer = require("nodemailer");
require("dotenv").config();

const { EMAIL_PASSWORD, BASE_EMAIL } = process.env;

const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: BASE_EMAIL,
    pass: EMAIL_PASSWORD,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async (data) => {
  const email = {
    ...data,
    from: BASE_EMAIL,
  };

  transport
    .sendMail(email)
    .then(() => {
      console.log("Email sended succes");
    })
    .catch((error) => console.log(error.message));
};

module.exports = { sendEmail };
