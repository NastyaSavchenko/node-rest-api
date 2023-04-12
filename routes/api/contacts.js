const express = require("express");

const router = express.Router();

const {
  addContactValidation,
  updateContactValidation,
  updateStatusContactValidation,
  objectIdValidation,
} = require("../../middleware/validation");

const { asyncWrapper } = require("../../helpers/apiHelpers");
const { authMiddleware } = require('../../middleware/authmiddleware');

const {
  getContactsListController,
  getContactByIdController,
  addContactController,
  removeContactController,
  updateContactController,
  updateFavoriteController,
} = require("../../controllers/contactControllers");

router.get("/", authMiddleware, asyncWrapper(getContactsListController));
router.get(
  "/:contactId",
  authMiddleware,
  objectIdValidation,
  asyncWrapper(getContactByIdController)
);
router.post("/", authMiddleware, addContactValidation, asyncWrapper(addContactController));
router.delete(
  "/:contactId",  
  authMiddleware,
  objectIdValidation,
  asyncWrapper(removeContactController)
);
router.put(
  "/:contactId",
  authMiddleware,
  objectIdValidation,
  updateContactValidation,
  asyncWrapper(updateContactController)
);
router.patch(
  "/:contactId/favorite",
  authMiddleware,
  objectIdValidation,
  updateStatusContactValidation,
  asyncWrapper(updateFavoriteController)
);

module.exports = router;