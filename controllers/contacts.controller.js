const contacts = require("../models/contacts.js");
const Joi = require("joi");

async function getContacts(req, res, next) {
  const contactList = await contacts.listContacts();
  return res.status(200).json(contactList);
}

async function getContact(req, res, next) {
  const { contactId } = req.params;
  const contactList = await contacts.getContactById(contactId);
  if (!contactList) {
    return next(res.status(404).json({ message: "Not found" }));
  }
  return res.status(200).json(contactList);
}

async function addContact(req, res, next) {
  const { name, email, phone } = req.body;

  const schema = Joi.object({
    name: Joi.string().min(2).required(),
    email: Joi.string().min(2).required(),
    phone: Joi.number().min(2).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(404).json({ message: "missing required name field" });
  }

  const newContact = await contacts.addContact({ name, email, phone });
  return res.status(201).json(newContact);
}

async function removeContact(req, res, next) {
  const { contactId } = req.params;
  const contact = await contacts.getContactById(contactId);

  if (!contact) {
    return res.status(404).json({ message: "Not found" });
  }

  await contacts.removeContact(contactId);
  return res.status(200).json({ message: "contact deleted" });
}

async function updateContact(req, res, next) {
  const { contactId } = req.params;
  const body = req.body;

  const contact = await contacts.getContactById(contactId);

  if (!contact) {
    return res.status(404).json({ message: "Not found" });
  }

  const schema = Joi.object({
    name: Joi.string().min(2).required(),
    email: Joi.string().min(2).required(),
    phone: Joi.number().min(2).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(404).json({ message: "missing required name field" });
  }

  const updContact = await contacts.updateContact(contactId, body);
  return res.status(200).json(updContact);
}

module.exports = {
  getContacts,
  getContact,
  addContact,
  removeContact,
  updateContact,
};
