const { User } = require("../../models/user");
const { createError, sendEmail, createVerifyEmail } = require("../../helpers");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");

const register = async (req, res) => {
  const { email, password, subscription } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw createError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const avatarURL = gravatar.url(email);

  const verificationCode = nanoid();

  const newUser = await User.create({
    email,
    subscription,
    password: hashPassword,
    avatarURL,
    verificationCode,
  });

  const verifyEmail = createVerifyEmail(email, verificationCode);

  await sendEmail(verifyEmail);

  res.status(201).json({
    email: newUser.email,
    subscription: newUser.subscription,
  });
};
module.exports = register;

// {"email": "test@gmail.com",
// "password": "12345678"}
