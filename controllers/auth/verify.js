const { User } = require("../../models/user");
const { createError } = require("../../helpers");

const verify = async (req, res) => {
  const { verificationCode } = req.params;
  const user = await User.findOne({ veryficationCode });
  if (!user) {
    throw createError(404);
  }

  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationCode: "",
  });

  res.json({
    messege: "Email verify success",
  });
};

module.exports = verify;
