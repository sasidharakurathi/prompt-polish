# Privacy Policy for Prompt Polish

**Last Updated:** January 05, 2026

## 1. Overview
**Prompt Polish** ("the Extension") is an open-source browser extension designed to optimize text prompts using AI. We prioritize your privacy and data security. The Extension operates on a **"Bring Your Own Key" (BYOK)** model and is designed to function entirely client-side.

## 2. Data Collection & Storage
**We do not collect, store, or transmit your personal data, usage analytics, or API keys to our own servers.** The Extension does not have a backend database.

### 2.1 API Keys
* Your Google Gemini API Key is stored **locally on your device** using your browser's secure storage API (`chrome.storage`).
* Your key is never shared with us or any third parties other than Google (for the purpose of authentication).

### 2.2 User Content (Prompts)
* The text you input into the Extension is sent directly from your browser to the **Google Gemini API** (`generativelanguage.googleapis.com`) for processing.
* This data transmission occurs directly between your computer and Google's servers. It does not pass through any intermediate servers owned by the Extension developers.

## 3. Third-Party Services
The Extension relies on the **Google Gemini API** to function. By using this Extension, you acknowledge that your prompt data is processed by Google in accordance with their policies:
* [Google Terms of Service](https://policies.google.com/terms)
* [Google API Services User Data Policy](https://developers.google.com/terms/api-services-user-data-policy)
* [Google Generative AI Terms](https://policies.google.com/terms/generative-ai)

## 4. Permissions
The Extension requests the minimum permissions necessary to function:
* **`storage`**: Required to save your API Key and preference (e.g., "Build Mode") locally on your device.
* **`activeTab` / `scripting`**: Required to read the text you are typing in the current tab and replace it with the optimized version.
* **Host Permissions**: RESTRICTED to specific AI domains (e.g., `chatgpt.com`, `claude.ai`) to ensure the extension does not run on unrelated websites.

## 5. Changes to This Policy
We may update our Privacy Policy from time to time. Thus, you are advised to review this page periodically for any changes. We will notify you of any changes by posting the new Privacy Policy on this page.

## 6. Contact Us
If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us via our [GitHub Repository](https://github.com/sasidharakurathi/prompt-polish).