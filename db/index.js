const { Sequelize } = require("sequelize");
const config = require("../config");

const { host, port, dialect, url } = config.local;
const sequelize = new Sequelize(url, {
  host,
  port,
  dialect,
});

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

module.exports = { sequelize };

testConnection();
