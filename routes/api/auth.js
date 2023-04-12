const express = require("express");

const router = express.Router();

const {
  registerValidation,
  loginValidation,
  subscriptionValidation,
} = require("../../middleware/validation");

const { authMiddleware } = require("../../middleware/authmiddleware");
const { asyncWrapper } = require("../../helpers/apiHelpers");

const {
  registrationController,
  loginController,
  logoutController,
  getCurrentUserController,
  updateSubscriptionController,
} = require("../../controllers/authControllers");

router.post(
  "/users/register",
  registerValidation,
  asyncWrapper(registrationController)
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

module.exports = router;
