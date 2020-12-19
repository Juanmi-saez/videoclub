const { MongoClient } = require('mongodb');
const { mongoConfig, DB_CONNECTION, DB_DATABASE } = require('../../config');

// Initialize connection once
let  catalogDB;
const authCollection =  `auth`;
const movieCollention= `movies`

function buildMongoOptions() {
  return {
    ...mongoConfig
  };
}


function close() {
  if (catalogDB) {
    catalogDB.connection.close();
    catalogDB = null;
  }
}

async function connect(config) {
  const connection = await MongoClient.connect(config.connectionString, buildMongoOptions());
  const database = connection.db(config.database);
  catalogDB = {
    config,
    connection,
    database
  };
}

const Equals = (json1, json2) => JSON.stringify(json1) === JSON.stringify(json2);

async function getConnection(name) {
  const config={
    connectionString: DB_CONNECTION,
    database: DB_DATABASE,
  }
  if (!catalogDB) {
    await connect(config, name);
  }
  else if(Equals(catalogDB.config, config) === false) {
    if(catalogDB.connection.isConnected() === true) {
      close();
    }
    await connect(config, name);
  }

  return catalogDB.database;
}

module.exports = { getConnection, close, authCollection , movieCollention};
