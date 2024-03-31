const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

module.exports = {
  port: process.env.PORT,
  local: {
    dbUrl: process.env.DB_URL,
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    dialect: process.env.DB_DIALECT,
    url: process.env.DB_URL,
  },
  jwtKey: process.env.JWT_SECRET,
};
