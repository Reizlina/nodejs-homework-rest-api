const { User } = require("../../models/user");
const { createError } = require("../../helpers");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  const { email, password, subscription } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw createError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    email,
    subscription,
    password: hashPassword,
  });

  res.status(201).json({
    email: newUser.email,
    subscription: newUser.subscription,
  });
};
module.exports = register;

// {"email": "test@gmail.com",
// "password": "12345678"}
