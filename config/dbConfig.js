require("dotenv").config();

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,

  options: {
    encrypt: false,
    trustServerCertificate: true,
    enableArithAbort: true,
    trustedConnection: false,
    instanceName: "SQLEXPRESS",
  },

  port: 1433,

  connectionTimeout: 30000,
  requestTimeout: 30000,

  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
};

module.exports = config;
