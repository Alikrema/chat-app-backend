const { Sequelize } = require('sequelize');
const config = require('../config');

const { host, port, user, password, database, dialect } = config.database;

const sequelize = new Sequelize(database, user, password, {
  host,
  port,
  dialect,
});

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

module.exports = { sequelize };

