const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "db/contacts.json");

// TODO: задокументировать каждую функцию
async function listContacts() {
  try {
    const allContacts = await fs.readFile(contactsPath);
    const contacts = JSON.parse(allContacts);
    console.table(contacts);
    return contacts;
  } catch (error) {
    console.log(error.message);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    if (!contactId) {
      throw new Error(`This contact is not found`);
    }
    const selectContact = contacts.find((contact) => contact.id === contactId);
    console.log(selectContact);
    return selectContact;
  } catch (error) {
    throw console.error(error.message);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const filteredContacts = contacts.filter(
      (contact) => contact.id !== contactId
    );
    await fs.writeFile(contactsPath, JSON.stringify(filteredContacts));
    console.table(filteredContacts);
    return filteredContacts;
  } catch (error) {
    throw console.error(error.message);
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();
    const newContact = {
      id: uuidv4(),
      name,
      email,
      phone,
    };
    contacts.push(newContact);
    console.table(contacts);
    return contacts;
  } catch (error) {
    throw console.error(error.message);
  }
}
addContact("Fanny", "113", "444444");
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
