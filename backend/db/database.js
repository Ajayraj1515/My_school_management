const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

db.serialize(() => {
  // Create tables
  db.run(`CREATE TABLE IF NOT EXISTS Users (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT CHECK(role IN ('student', 'teacher')) NOT NULL
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS Students (
    student_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    grade TEXT,
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES Users (user_id)
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS Teachers (
    teacher_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    subject TEXT,
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES Users (user_id)
  )`);
});

module.exports = db;
