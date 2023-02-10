const express = require("express");
// const contacts = require("../../models/contacts.js");
const {
  getContacts,
  getContact,
  addContact,
  removeContact,
  updateContact,
} = require("../../controllers/contacts.controller.js");
const router = express.Router();

router.get("/", getContacts);

router.get("/:contactId", getContact);

router.post("/", addContact);

router.delete("/:contactId", removeContact);

router.put("/:contactId", updateContact);

module.exports = router;
