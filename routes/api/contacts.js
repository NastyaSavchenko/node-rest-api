const express = require("express");

const router = express.Router();

const {
  addContactValidation,
  updateContactValidation,
  updateStatusContactValidation,
  objectIdValidation,
} = require("../../middleware/validation");

const { asyncWrapper } = require("../../helpers/apiHelpers");

const {
  getContactsListController,
  getContactByIdController,
  addContactController,
  removeContactController,
  updateContactController,
  updateFavoriteController,
} = require("../../controllers/contactControllers");

router.get("/", asyncWrapper(getContactsListController));
router.get(
  "/:contactId",
  objectIdValidation,
  asyncWrapper(getContactByIdController)
);
router.post("/", addContactValidation, asyncWrapper(addContactController));
router.delete(
  "/:contactId",  
  objectIdValidation,
  asyncWrapper(removeContactController)
);
router.put(
  "/:contactId",
  objectIdValidation,
  updateContactValidation,
  asyncWrapper(updateContactController)
);
router.patch(
  "/:contactId/favorite",
  objectIdValidation,
  updateStatusContactValidation,
  asyncWrapper(updateFavoriteController)
);

module.exports = router;