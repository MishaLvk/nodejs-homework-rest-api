const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");

const contactsPath = path.resolve(__dirname, "./contacts.json");

async function readContacts() {
  const listContacts = await fs.readFile(contactsPath);
  const listContactsParse = JSON.parse(listContacts);
  return listContactsParse;
}

const listContacts = async () => {
  try {
    const listContacts = await readContacts();
    return listContacts;
  } catch (error) {
    console.log(error);
  }
};

const getContactById = async (contactId) => {
  try {
    const listContacts = await readContacts();
    const contact = listContacts.filter((contact) => contact.id === contactId);
    if (contact.length === 0) {
      return null;
    }

    return contact;
  } catch (error) {
    console.log(error);
  }
};

const removeContact = async (contactId) => {
  try {
    const listContacts = await readContacts();
    const newListContacts = listContacts.filter(
      (contact) => contact.id !== contactId
    );
    await fs.writeFile(contactsPath, JSON.stringify(newListContacts, null, 2));
  } catch (error) {
    console.log(error);
  }
};

const addContact = async ({ name, email, phone }) => {
  try {
    // const { name, email, phone } = body;
    const id = nanoid();
    const contact = {
      id,
      name,
      email,
      phone,
    };
    const listContacts = await readContacts();
    listContacts.push(contact);
    await fs.writeFile(contactsPath, JSON.stringify(listContacts, null, 2));
    return contact;
  } catch (error) {
    console.log(error);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const { name, email, phone } = body;
    const id = contactId;
    const listContacts = await readContacts();
    const index = listContacts.findIndex((contact) => contact.id === id);

    listContacts[index] = { id, name, email, phone };

    await fs.writeFile(contactsPath, JSON.stringify(listContacts, null, 2));
    return listContacts[index];
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
