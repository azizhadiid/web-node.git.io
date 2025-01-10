const fs = require('fs');

// Membuat folder data
const dirPath = './data';
if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
};

// Membuat file contact json jika tidak ada
const dataPath = './data/contacts.json';
if (!fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath, '[]', 'utf-8');
};

// Ambil semua data di contact.json
const loadContact = () => {
    const file = fs.readFileSync('data/contacts.json', 'utf-8');
    const contacts = JSON.parse(file);
    return contacts;
};

// Mencari contact berdasarkan nama
const findContact = (nama) => {
    const contacts = loadContact();
    const contact = contacts.find((contact) => contact.nama.toLowerCase() === nama.toLowerCase());
    return contact;
};

// Menulis/menimpa file json dengan data baru
const saveContacts = (contacts) => {
    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));
};

// Menambahkan kontak baru
const addContact = (contact) => {
    const contacts = loadContact();
    contacts.push(contact);
    saveContacts(contacts);
};

// Cek nama yang duplikat
const cekDuplikat = (nama) => {
    const contacts = loadContact();

    return contacts.find((contact) => contact.nama === nama);
};

// Hapus Kontak
const deleteContact = (nama) => {
    const contacts = loadContact();

    const filterContacts = contacts.filter((contact) => contact.nama !== nama);
    saveContacts(filterContacts);
};

// Update Contact
const updateContact = (contactBaru) => {
    const contacts = loadContact();
    // Hilangkan kontak lama yang nama === oldNama
    const filterContacts = contacts.filter((contact) => contact.nama !== contactBaru.oldNama);
    delete contactBaru.oldNama;
    filterContacts.push(contactBaru);
    saveContacts(filterContacts);
};

module.exports = {
    loadContact,
    findContact,
    addContact,
    cekDuplikat,
    deleteContact,
    updateContact
};