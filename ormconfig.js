const AdminUser = require('nestjs-admin').AdminUserEntity

const databaseURL = process.env.DATABASE_URL

if (databaseURL) {
  const postgresUrl = /^(.+?):\/\/(.+?):(.+?)@([\w-.]+?):(\d{2,4})\/(.+?)$/
  const matches = databaseURL.match(postgresUrl)
  if (matches) {
    var [_, DB_PROVIDER, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME] = matches;
  } else {
    throw new Error(`config error - DATABSE_URL given but with an invalid format`);
  }
}

module.exports = {
  "type": "postgres",
  "host": DB_HOST || process.env.DB_HOST,
  "port": DB_PORT || process.env.DB_PORT,
  "username": DB_USER || process.env.DB_USER,
  "password": DB_PASSWORD || process.env.DB_PASSWORD,
  "database": DB_NAME || process.env.DB_NAME,
  "entities": [
    "src/**/*.entity.ts", AdminUser
  ],
  "synchronize": true,
  "autoLoadEntities": true
}