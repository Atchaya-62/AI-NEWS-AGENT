# 🚀 AI News Agent

AI News Agent is a Windows-based AI news notification system that automatically delivers the latest AI news updates directly to the user's desktop whenever the laptop starts.

The project uses automation workflows, AI summarization, and Windows notification scripting to create a lightweight personal AI news assistant.

Unlike browser-based notification systems, this project uses a VBScript (.vbs) startup notification mechanism integrated with Windows.

---

# 🧠 What This Project Does

* Automatically fetches latest AI news
* Uses AI to summarize important updates
* Triggers Windows desktop notifications
* Runs automatically when the laptop starts
* Delivers AI news updates without opening a browser
* Acts like a personal AI news assistant running in the background

---

# ⚡ How It Works

```txt
AI News APIs / Sources
          ↓
      n8n Workflow
          ↓
AI Processing & Summarization
          ↓
Generated News Output
          ↓
VBScript (.vbs) Notification Trigger
          ↓
Windows Desktop Notification
```

---

# 🔄 Workflow Overview

1. n8n automation fetches AI news from APIs or feeds
2. Important articles are filtered
3. AI generates concise summaries
4. The generated output is stored or processed locally
5. A `.vbs` script triggers Windows notifications
6. Notifications appear automatically whenever the laptop starts

---

# 🛠️ Tech Stack

## Backend

* Python
* SQLite

## Automation

* n8n

## AI & APIs

* OpenAI API
* News APIs

## Notification System

* VBScript (.vbs)
* Windows Notification System

## Database

* SQLite

---

# ⚠️ Important Notification Setup

This project uses native Windows desktop notifications triggered using a `.vbs` script.

For notifications to work correctly:

* Windows notifications must be enabled
* Focus Assist / Do Not Disturb should be turned OFF
* The `.vbs` startup script must be placed inside the Windows startup folder

Open the startup folder using:

```txt
shell:startup
```

Place the startup `.vbs` file inside this folder so the notification system launches automatically whenever the laptop starts.

---


Built by Atchaya
