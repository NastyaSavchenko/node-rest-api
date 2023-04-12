const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateFavoriteContact,
} = require("../models/contacts");

const getContactsListController = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const {page = 1, limit = 10} = req.query;
    const { favorite } = req.query;
    // limit = limit > 10 ? 10 : limit;
    const skip = (page - 1) * limit;
    const contactsList = await listContacts(owner, favorite, {skip, limit});
    return res.status(200).json({contactsList, page, limit});
  } catch (error) {
    next(error.message);
  }
};

const getContactByIdController = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const contactById = await getContactById(req.params.contactId, owner);
    if (!contactById) {
      res.status(404).json({ message: "Not found" });
      return;
    }
    return res.status(200).json(contactById);
  } catch (error) {
    next(error.message);
  }
};

const addContactController = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const newContact = await addContact(
      {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        favorite: false,
      },
      owner
    );
    return res.status(201).json(newContact);
  } catch (error) {
    next(error.message);
  }
};

const removeContactController = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const contactById = await getContactById(req.params.contactId, owner);

    if (!contactById) {
      res.status(404).json({ message: "Not found" });
      return;
    }
    await removeContact(req.params.contactId);
    return res.status(200).json({ message: "Contact deleted" });
  } catch (error) {
    next(error.message);
  }
};

const updateContactController = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const updatedContact = await updateContact(
      req.params.contactId,
      req.body,
      owner
    );
    if (!updatedContact) {
      return res.status(404).json({ message: "Not found" });
    }
    return res.status(200).json({ message: "Contact updated" });
  } catch (error) {
    next(error.message);
  }
};

const updateFavoriteController = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const updateFavorite = await updateFavoriteContact(
      req.params.contactId,
      req.body,
      owner
    );
    if (!updateFavorite) {
      return res.status(400).json({ message: "missing field favorite" });
    }
    return res.status(200).json({ message: "contact add to favorite" });
  } catch (error) {
    next(error.message);
  }
};

module.exports = {
  getContactsListController,
  getContactByIdController,
  addContactController,
  removeContactController,
  updateContactController,
  updateFavoriteController,
};
