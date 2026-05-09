const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Path to the SQLite database file
const dbPath = path.resolve(__dirname, 'news.db');

// Create or connect to the database
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
    db.run(`CREATE TABLE IF NOT EXISTS news (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      summary TEXT NOT NULL,
      source TEXT NOT NULL,
      priority INTEGER DEFAULT 0,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )`, (err) => {
      if (err) {
        console.error('Error creating table:', err.message);
      } else {
        console.log('News table is ready.');
      }
    });
    // Add priority column if it doesn't exist
    db.run(`ALTER TABLE news ADD COLUMN priority INTEGER DEFAULT 0;`, (err) => {
      if (err && !err.message.includes('duplicate column name')) {
        console.error('Error adding priority column:', err.message);
      }
    });
  }
});

// Function to insert news into the database
function insertNews(title, summary, source, priority = 0) {
  const query = `INSERT INTO news (title, summary, source, priority) VALUES (?, ?, ?, ?)`;
  db.run(query, [title, summary, source, priority], function (err) {
    if (err) {
      console.error('Error inserting news:', err.message);
    } else {
      console.log('News inserted with ID:', this.lastID);
    }
  });
}

// Function to fetch the latest news from the database
function getLatestNews(callback) {
  const query = `SELECT * FROM news ORDER BY timestamp DESC LIMIT 1`;
  db.get(query, [], (err, row) => {
    if (err) {
      console.error('Error fetching latest news:', err.message);
      callback(err, null);
    } else {
      callback(null, row);
    }
  });
}

module.exports = { db, insertNews, getLatestNews };