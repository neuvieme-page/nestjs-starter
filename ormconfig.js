const AdminUser = require('nestjs-admin').AdminUserEntity

module.exports = {
  "type": "postgres",
  "host": "localhost",
  "port": 5432,
  "username": "user",
  "password": "example",
  "database": "database",
  "entities": [
    "src/**/*.entity.ts", AdminUser
  ],
  "synchronize": true,
  "autoLoadEntities": true
}