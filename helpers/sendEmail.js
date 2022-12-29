const sgMail = require("@sendgrid/mail");

require("dotenv").config();

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
  const email = { ...data, from: "reizlina.tanya@gmail.com" };
  await sgMail.send(email);
  return true;
};

module.exports = sendEmail;

// const email = {
//   to: "kepip71165@letpays.com",
//   from: "reizlina.tanya@gmail.com",
//   subject: "Verify email",
//   html: "<p>Verify your email</p>",
// };

// sgMail
//   .send(email)
//   .then(() => console.log("Email send succsess"))
//   .catch((error) => console.log(error.message));
