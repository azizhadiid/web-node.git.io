const { MongoClient } = require('mongodb');

const uri = 'mongodb://127.0.0.1:27017';
const dbname = 'mongoBelajar';

const client = new MongoClient(uri)