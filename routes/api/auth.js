const express = require("express");

const router = express.Router();

const {
  registerValidation,
  loginValidation,
  subscriptionValidation,
  emailValidation,
} = require("../../middleware/validation");

const { authMiddleware } = require("../../middleware/authmiddleware");
const { upload } = require("../../middleware/upload");
const { asyncWrapper } = require("../../helpers/apiHelpers");

const {
  registrationController,
  loginController,
  logoutController,
  getCurrentUserController,
  updateSubscriptionController,
  updateAvatarController,
  verifyEmailController,
  resendVerifyEmailController,
} = require("../../controllers/authControllers");

router.post(
  "/users/register",
  registerValidation,
  asyncWrapper(registrationController)
);
router.get(
  "/users/verify/:verificationToken",
  asyncWrapper(verifyEmailController)
);

router.post(
  "/users/verify",
  emailValidation,
  asyncWrapper(resendVerifyEmailController)
);

router.post("/users/login", loginValidation, asyncWrapper(loginController));

router.post("/users/logout", authMiddleware, asyncWrapper(logoutController));

router.get(
  "/users/current",
  authMiddleware,
  asyncWrapper(getCurrentUserController)
);

router.patch(
  "/users",
  authMiddleware,
  subscriptionValidation,
  asyncWrapper(updateSubscriptionController)
);

router.patch(
  "/users/avatars",
  authMiddleware,
  upload.single("avatar"),
  asyncWrapper(updateAvatarController)
);

module.exports = router;
