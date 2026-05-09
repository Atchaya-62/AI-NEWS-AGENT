const notifier = require('node-notifier');
const fs = require('fs');
const { exec } = require('child_process');
const { getLatestNews } = require('./database');

// Read the content of news.txt
const newsContent = fs.readFileSync('e:/ai-news-agent/news.txt', 'utf-8');
const [title, ...textLines] = newsContent.split('\n');
const text = textLines.join('\n');

// Fetch the latest news from the database
getLatestNews((err, news) => {
  if (err) {
    console.error('Error fetching news:', err);
    return;
  }

  if (news) {
    // Show a message box that waits for user to click OK
    const message = `${news.title}\n\n${news.summary}\n\nSource: ${news.source}`;
    const command = `powershell.exe -WindowStyle Hidden -Command "Add-Type -AssemblyName PresentationFramework; [System.Windows.MessageBox]::Show('${message.replace(/'/g, "''")}', 'AI News Agent')"`;
    exec(command, (err, stdout, stderr) => {
      if (err) {
        console.error('Error showing message box:', err);
      } else {
        console.log('Message box displayed');
      }
    });
  } else {
    console.log('No news available to display.');
  }
});