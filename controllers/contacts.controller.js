// const contacts = require("../models/contacts.js");
// const { options } = require("joi");
const Joi = require("joi");
const { Contact } = require("../models/contact.js");

async function getContacts(req, res, next) {
  const contactList = await Contact.find();
  return res.status(200).json(contactList);
}

async function getContact(req, res, next) {
  const { contactId } = req.params;
  const contactList = await Contact.findById(contactId);
  if (!contactList) {
    return next(res.status(404).json({ message: "Not found" }));
  }
  return res.status(200).json(contactList);
}

async function addContact(req, res, next) {
  const { name, email, phone, favorite } = req.body;

  const schema = Joi.object({
    name: Joi.string().min(2).required(),
    email: Joi.string().min(2).required(),
    phone: Joi.number().min(2).required(),
    favorite: Joi.boolean(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(404).json({ message: "missing required name field" });
  }

  const newContact = await Contact.create({ name, email, phone, favorite });
  return res.status(201).json(newContact);
}

async function removeContact(req, res, next) {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId);

  if (!contact) {
    return res.status(404).json({ message: "Not found" });
  }

  await Contact.findByIdAndRemove(contactId);
  return res.status(200).json({ message: "contact deleted" });
}

async function updateContact(req, res, next) {
  const { contactId } = req.params;
  const body = req.body;

  const contact = await Contact.findById(contactId);

  if (!contact) {
    return res.status(404).json({ message: "Not found" });
  }

  const schema = Joi.object({
    name: Joi.string().min(2).required(),
    email: Joi.string().min(2).required(),
    phone: Joi.number().min(2).required(),
    favorite: Joi.boolean(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(404).json({ message: "missing required name field" });
  }

  const updContact = await Contact.findByIdAndUpdate(contactId, body, {
    new: true,
  });
  return res.status(200).json(updContact);
}

async function updateStatusContact(req, res, next) {
  const { contactId } = req.params;
  const body = req.body;

  const contact = await Contact.findById(contactId);

  if (!contact) {
    return res.status(404).json({ message: "Not found" });
  }

  const schema = Joi.object({
    favorite: Joi.boolean().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "missing field favorite" });
  }

  const updContact = await Contact.findByIdAndUpdate(contactId, body, {
    new: true,
  });
  return res.status(200).json(updContact);
}

module.exports = {
  getContacts,
  getContact,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
};
