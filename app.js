const express = require("express");
const logger = require("morgan");
const cors = require("cors");

// const nodemailer = require("nodemailer");

require("dotenv").config();

// const { META_PASSWORD } = process.env;

// const nodemailerConfig = {
//   host: "smtp.meta.ua",
//   port: 465,
//   secure: true,
//   auth: {
//     user: "reizlina@meta.ua",
//     pass: META_PASSWORD,
//   },
// };

// const transport = nodemailer.createTransport(nodemailerConfig);

// const email = {
//   to: "kepip71165@letpays.com",
//   from: "reizlina@meta.ua",
//   subject: "Verify email",
//   html: "<p>Verify your email</p>",
// };

// transport
//   .sendMail(email)
//   .then(() => console.log("Email send succsess"))
//   .catch((error) => console.log(error.message));

const authRouter = require("./routes/api/auth");

const contactsRouter = require("./routes/api/contacts");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/auth", authRouter);
app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
