const { MongoMemoryServer } = require('mongodb-memory-server');
const { MongoClient } = require('mongodb');

let database = null;

async function startDatabase() {
  const mongo = await MongoMemoryServer.create();
  const uri = mongo.getUri();
  database = (await MongoClient.connect(uri)).db();
  // database = connection.db();
}

async function getDatabase() {
  if (!database) await startDatabase();
  return database;
}

module.exports = {
  getDatabase,  
  startDatabase,
};