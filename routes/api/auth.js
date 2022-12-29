const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/auth");

const { ctrlWrapper } = require("../../helpers");
const { validateBody, authenticate, upload } = require("../../middlewares");

const { schemas } = require("../../models/user");

//signup
router.post(
  "/users/register",
  validateBody(schemas.registerSchema),
  ctrlWrapper(ctrl.register)
);

router.get("/verify/:verificationCode", ctrlWrapper(ctrl.verify));

router.post(
  "/verify",
  validateBody(schemas.loginSchema),
  ctrlWrapper(ctrl.resendEmail)
);

//login
router.post(
  "/users/login",
  validateBody(schemas.loginSchema),
  ctrlWrapper(ctrl.login)
);

router.get("/users/current", authenticate, ctrlWrapper(ctrl.getCurrent));

router.get("/users/logout", authenticate, ctrlWrapper(ctrl.updateAvatar));

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrlWrapper(ctrl.logout)
);

module.exports = router;
