const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./users.db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    reg TEXT,
    dob TEXT,
    email TEXT
  )`);

  // Insert dummy data
  const stmt = db.prepare("INSERT INTO users (name, reg, dob, email) VALUES (?, ?, ?, ?)");
  stmt.run("John Doe", "REG001", "1990-01-15", "john@example.com");
  stmt.run("Jane Smith", "REG002", "1992-05-20", "jane@example.com");
  stmt.run("Ali Khan", "REG003", "1991-08-10", "ali@example.com");
  stmt.finalize();
});

module.exports = db;