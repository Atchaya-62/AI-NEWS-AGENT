const express = require("express");
const cors = require("cors");
const fs = require("fs");
const { exec } = require('child_process');
const { insertNews, getLatestNews } = require('./database');

const app = express();
app.use(cors());
app.use(express.json());

app.get("/news", (req, res) => {
  // For simplicity, since we don't have a function to get all news, we'll use a query here
  const db = require('./database').db;
  db.all(`SELECT * FROM news ORDER BY priority DESC, timestamp DESC`, [], (err, rows) => {
    if (err) {
      console.error('Error fetching news:', err);
      res.status(500).send({ error: 'Failed to fetch news' });
    } else {
      res.json(rows);
    }
  });
});

app.post("/news", (req, res) => {
  const { title, summary, source } = req.body;

  if (!title || !summary || !source) {
    return res.status(400).send({ error: "Missing required fields: title, summary, or source." });
  }

  // Determine priority based on keywords
  let priority = 0;
  const text = `${title} ${summary}`.toLowerCase();
  if (text.includes('anthropic') || text.includes('openai')) {
    priority = 10;
  } else if (text.includes('ai') || text.includes('tech') || text.includes('technology')) {
    priority = 5;
  }

  // Insert news into the database
  insertNews(title, summary, source, priority);

  // Update news.txt with the latest news
  const newsContent = `${title}\n\n${summary}\n\nSource: ${source}`;
  fs.writeFileSync('news.txt', newsContent);

  console.log("✅ News saved to database and news.txt updated");

  // Run the VBS notification
  exec('wscript.exe "E:\\ai-news-agent\\notify.vbs"', (err, stdout, stderr) => {
    if (err) {
      console.error('Error running notification:', err);
    } else {
      console.log('Notification displayed');
    }
  });

  res.send({ status: "saved" });
});

app.listen(3001, () => {
  console.log("🚀 Server running on http://localhost:3001");
});