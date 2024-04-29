const fs = require("fs/promises");
const path = require("path");
const nanoId = require("nanoid").nanoid;

const contactPath = path.join(__dirname, "/db/contacts.json");

async function listContacts() {
  const allContactsJson = await fs.readFile(contactPath, "utf-8");
  return JSON.parse(allContactsJson);
}

async function getContactById(contactId) {
  const allContacts = await listContacts();

  const contactById = allContacts.find((contact) => {
    return contact.id === contactId;
  });
  return contactById || null;
}

async function removeContact(contactId) {
  const allContacts = await listContacts();
  const contactToDelete = await getContactById(contactId);

  if (contactToDelete) {
    const newContactsList = allContacts.filter((contact) => {
      return contact.id !== contactId;
    });
    fs.writeFile(contactPath, JSON.stringify(newContactsList, null, 2));
    return contactToDelete;
  } else {
    return null;
  }
}

async function addContact(name, email, phone) {
  const allContact = await listContacts();
  const newContact = {
    id: nanoId(),
    name,
    email,
    phone,
  };
  allContact.push(newContact);
  fs.writeFile(contactPath, JSON.stringify(allContact, null, 2));
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
