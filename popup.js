document.addEventListener('DOMContentLoaded', () => {
    const apiKeyInput = document.getElementById('apiKey');
    const modeSelect = document.getElementById('modeSelect');
    const saveBtn = document.getElementById('saveBtn');
    const status = document.getElementById('status');

    chrome.storage.sync.get(['geminiApiKey', 'promptMode'], (result) => {
        if (result.geminiApiKey) {
            apiKeyInput.value = result.geminiApiKey;
        }
        if (result.promptMode) {
            modeSelect.value = result.promptMode;
        }
    });

    saveBtn.addEventListener('click', () => {
        const key = apiKeyInput.value.trim();
        const mode = modeSelect.value;

        if (key) {
            chrome.storage.sync.set({ 
                geminiApiKey: key,
                promptMode: mode 
            }, () => {
                status.style.display = 'block';
                setTimeout(() => { status.style.display = 'none'; }, 2000);
            });
        }
    });
});