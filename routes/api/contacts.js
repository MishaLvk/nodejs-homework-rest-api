const express = require("express");

const {
  getContacts,
  getContact,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
} = require("../../controllers/contacts.controller.js");
const router = express.Router();

router.get("/", getContacts);

router.get("/:contactId", getContact);

router.post("/", addContact);

router.delete("/:contactId", removeContact);

router.put("/:contactId", updateContact);

router.patch("/:contactId/favorite", updateStatusContact);

module.exports = router;
