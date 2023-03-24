const express = require('express')
const router = express.Router()
const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");

router.get("/", async (req, res, next) => {
  try {
    const contactsList = await listContacts();
    return res.status(200).json(contactsList);
  } catch (error) {
    next(error.message);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const contactById = await getContactById(req.params.contactId);
    if (!contactById) {
      res.status(404).res.json({ message: "Not found" });
      return;
    }
    return res.status(200).json(contactById);
  } catch (error) {
    next(error.message);
  }
});

router.post("/", async (req, res, next) => {
  try {
      const { error } = schema.validate(req.body);
  if (error) {
    res.status(400).json({ message: "missing required name field" });
  }
    await addContact(req, res);
  } catch (error) {
    next(error.message);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const contactById = await removeContact(req.params.contactId);
    if (!contactById) {
      res.status(404).res.json({ message: "Not found" });
      return;
    }
    return res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    next(error.message);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = schema.validate(req.body);
    if (error) {
      res.status(400).json({ message: "missing fields" });
    }
    const updatedContact = await updateContact(req, req);
    if (!updatedContact) {
      return res.status(404).json({ message: "Not found" });
    }
    return res.status(200).json(updatedContact);
  } catch (error) {
    next(error.message);
  }
});

module.exports = router;