const { Contact } = require("../db/contactModel");

const listContacts = async (owner, favorite, {skip, limit}) => {
  const queryObject = { owner: owner };
  if (favorite) {
    queryObject.favorite = favorite === "true";
  }

  const contactsList = await Contact.find(queryObject).populate('owner', 'email')
    .skip(skip)
    .limit(limit);
  return contactsList;
};

const getContactById = async (contactId, owner) => {
  return Contact.findById(contactId, owner);
};

const removeContact = async (contactId, owner) => {
  return Contact.findByIdAndRemove(contactId);
};

const addContact = async (body, owner) => {
  const { name, email, phone } = body;
  return Contact.create({ owner, name, email, phone });
};

const updateContact = async (contactId, body, owner) => {
  const { name, email, phone } = body;
  return Contact.findByIdAndUpdate(contactId, {
    $set: { name, email, phone },
    runValidators: true,
  }, owner);
};

const updateFavoriteContact = async (contactId, body, owner) => {
  const { favorite } = body;
  return Contact.findByIdAndUpdate(contactId, {
    $set: { favorite },
    runValidators: true,
  }, owner);
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateFavoriteContact,
};