const mysql2 = require("mysql2");

class Database {
  constructor() {
    this.host = process.env.DB_HOST || "localhost";
    this.user = process.env.DB_USER || "root";
    this.password = process.env.DB_PASSWORD || "";
    this.database = process.env.DB_NAME || "iara_db";
  }

  createConnection() {
    let db = mysql2.createConnection({
      host: this.host,
      user: this.user,
      password: this.password,
      database: this.database
    });

    return db;
  }
}

module.exports = Database;
