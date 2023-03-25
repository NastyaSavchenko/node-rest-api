const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.resolve("models/contacts.json");

const listContacts = async () => {
  try {
    const contactsList = await fs.readFile(contactsPath, "utf8");
    return JSON.parse(contactsList);
  } catch (error) {
    console.log(error.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const contactsList = await listContacts();
    const contactById = contactsList.filter(
      (contact) => contact.id === contactId
    );
    return contactById;
  } catch (error) {
    console.log(error.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const contactsList = await listContacts();
    const newContactsList = contactsList.filter(
      (contact) => contact.id !== contactId
    );
    await fs.writeFile(
      contactsPath,
      JSON.stringify(newContactsList, null, "\t")
    );
  } catch (error) {
    console.log(error.message);
  }
};

const addContact = async (req, res) => {
  try {
    const contactsList = await listContacts();
    const contactNew = {
      id: uuidv4(),
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
    };
    const newContactsList = JSON.stringify(
      [...contactsList, contactNew],
      null,
      "\t"
    );

    await fs.writeFile(contactsPath, newContactsList);

    return newContactsList;
  } catch (error) {
    console.log(error.message);
  }
};

const updateContact = async (req, res) => {
  try {
    const contactsList = await listContacts();

    const id = req.params.contactId;
    const { name, email, phone } = req.body;

      if (!name && !email && !phone) {
    res.status(400).json({ message: "missing fields" });
    return;
  }

    const [contactById] = contactsList.filter(
      (contact) => contact.id === id
    );
    contactById.name = name;
    contactById.email = email;
    contactById.phone = phone;

    const newContactsList = JSON.stringify(contactsList, null, "\t");

    await fs.writeFile(contactsPath, newContactsList);

    return newContactsList;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};