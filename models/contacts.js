const { Contact } = require("../db/contactModel");

const listContacts = async () => {
  const contactsList = await Contact.find({});
  return contactsList;
};

const getContactById = async (contactId) => {
  return Contact.findById(contactId);
};

const removeContact = async (contactId) => {
  return Contact.findByIdAndRemove(contactId);
};

const addContact = async (body) => {
  const { name, email, phone } = body;
  return Contact.create({ name, email, phone });
};

const updateContact = async (contactId, body) => {
  const { name, email, phone } = body;
  return Contact.findByIdAndUpdate(contactId, {
    $set: { name, email, phone },
    runValidators: true,
  });
};

const updateFavoriteContact = async (contactId, body) => {
  const { favorite } = body;
  return Contact.findByIdAndUpdate(contactId, {
    $set: { favorite },
    runValidators: true,
  });
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateFavoriteContact,
};