# ✨ Prompt Polish - AI Prompt Optimizer

**Stop writing weak prompts. Start getting engineer-grade results.**

Prompt Polish is a lightweight Chrome Extension that instantly transforms your raw, generic ideas into highly optimized, professional prompts using Google's powerful `gemma-3-27b-it` model.

It intercepts your typing on popular AI sites and offers a one-click "Polish" button.


## 🚀 Why use this?
Developers often get bad code from AI because they write bad prompts (the "Garbage In, Garbage Out" problem).

* **You type:** "fix this error"
* **Prompt Polish makes it:** "Act as a Senior QA Engineer. Analyze the following error log for root causes, explain why it occurred, and provide three distinct solutions for fixing it defensively..."

It applies **Persona-based**, **Contextual**, and **Chain-of-Thought** prompting techniques automatically.

## 🎛️ Smart Modes
The extension adapts to your current goal. Select a mode in the extension popup:

1.  **🛠️ Build (Default):** Best for writing code, architecting features, and creating projects. Acts as a Senior Software Architect.
2.  **🧠 Learn:** Best for understanding complex topics. Acts as a Technical Educator (using analogies and simple breakdowns).
3.  **🐛 Debug:** Best for pasting errors. Acts as a DevOps/QA expert focused on root cause analysis.

## ✅ Supported Sites
For performance and privacy, Prompt Polish only runs on these specific AI platforms:
* ChatGPT (`chatgpt.com` / `chat.openai.com`)
* Google Gemini (`gemini.google.com`)
* Claude (`claude.ai`)
* DeepSeek (`chat.deepseek.com`)
* Perplexity AI (`perplexity.ai`)
* HuggingChat (`huggingface.co/chat`)

## 🔒 Security (Bring Your Own Key)
This extension is open-source and client-side only.
* It does **not** have a backend server.
* You must provide your own free Google Gemini API Key.
* Your key is stored locally in your browser's secure `chrome.storage` and is only used to make direct calls to Google's API.

## 🛠️ Installation & Setup

### 1. Install the Extension
*(Since this is not yet on the Chrome Web Store, install it in Developer Mode)*

1.  Clone or download this repository.
2.  Open Chrome and navigate to `chrome://extensions`.
3.  Toggle **Developer mode** in the top right corner.
4.  Click **Load unpacked**.
5.  Select the downloaded project folder.

### 2. Setup API Key
1.  Go to [Google AI Studio](https://aistudio.google.com/) and get a free API Key.
2.  Click the **✨ Prompt Polish** icon in your browser toolbar.
3.  Paste your API Key into the settings menu.
4.  Select your desired Mode.
5.  Click **Save Settings**.

### 3. Use It
1.  Go to any supported site (e.g., ChatGPT).
2.  Type a rough idea into the chat box.
3.  Click the floating **✨ Polish** button.
4.  Watch your prompt transform!

---
**License**
MIT License. Feel free to fork and improve!