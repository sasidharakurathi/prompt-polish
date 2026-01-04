let currentInput = null;
let polishBtn = null;


const MODES = {
    build: `You are a Senior Software Architect. Rewrite the user's request into a detailed technical specification.
            Techniques:
            1. Role: Senior Developer.
            2. Structure: Context, Requirements, Implementation Steps, Constraints.
            3. Tone: Professional, technical, concise.
            4. Output: NO conversational filler. Only the prompt.`,

    learn: `You are an expert Technical Educator (like Feynman). Rewrite the user's request into a prompt that asks for deep conceptual understanding.
            Techniques:
            1. Role: Teacher/Mentor.
            2. Goal: Ask for analogies, step-by-step breakdowns, and "why" it works.
            3. Structure: Concept Definition, Real-world Analogy, Technical Explanation.
            4. Output: NO conversational filler. Only the prompt.`,

    debug: `You are a Senior DevOps & QA Engineer. Rewrite the user's request (likely an error or buggy code) into a prompt that seeks root cause analysis.
            Techniques:
            1. Role: Debugging Expert.
            2. Goal: Ask to identify the error, explain WHY it happened, and suggest 3 distinct fixes.
            3. Structure: Error Analysis, Root Cause, Fix Options.
            4. Output: NO conversational filler. Only the prompt.`
};


async function optimizePrompt(userText) {
    if (!userText || userText.trim().length === 0) return userText;

    const storageData = await chrome.storage.sync.get(['geminiApiKey', 'promptMode']);
    const API_KEY = storageData.geminiApiKey;
    const currentMode = storageData.promptMode || 'build'; 

    if (!API_KEY) {
        alert("⚠️ Prompt Polish: Please setup your API Key in the extension!");
        return userText;
    }

    const baseInstruction = MODES[currentMode];
    
    const systemInstruction = `
    ${baseInstruction}
    
    Raw User Input: "${userText}"
    `;

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemma-3-27b-it:generateContent?key=${API_KEY}`;

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{ parts: [{ text: systemInstruction }] }]
            })
        });

        const data = await response.json();
        
        if (data.error) {
            console.error("AI Error:", data.error);
            alert("Model Error: " + data.error.message + "\n\nTip: Ensure your API Key supports Gemma 3.");
            return userText;
        }

        return data.candidates[0].content.parts[0].text;

    } catch (error) {
        console.error("Network Error:", error);
        return userText;
    }
}


function createButton() {
    const btn = document.createElement("button");
    btn.innerHTML = "✨ Polish";
    btn.className = "prompt-polish-btn";
    btn.style.display = "none";
    
    btn.addEventListener("mousedown", async (e) => {
        e.preventDefault();
        if (currentInput) {
            const originalLabel = "✨ Polish";
            
            btn.innerHTML = "⏳ Fixing...";
            btn.classList.add('loading');

            await applyOptimization(currentInput);
            
            btn.innerHTML = "✅ Done!";
            btn.classList.remove('loading');
            
            setTimeout(() => {
                btn.innerHTML = originalLabel;
            }, 1500);
        }
    });

    document.body.appendChild(btn);
    return btn;
}


async function applyOptimization(element) {
    let originalText = "";

    if (element.tagName === "TEXTAREA" || element.tagName === "INPUT") {
        originalText = element.value;
        const newText = await optimizePrompt(originalText);
        element.value = newText;
    } 
    else if (element.isContentEditable) {
        originalText = element.innerText;
        const newText = await optimizePrompt(originalText);
        element.innerText = newText;
    }

    const event = new Event('input', { bubbles: true });
    element.dispatchEvent(event);
    
    const changeEvent = new Event('change', { bubbles: true });
    element.dispatchEvent(changeEvent);
}


function getEditableElement(target) {
    if (target.tagName === "TEXTAREA" || (target.tagName === "INPUT" && target.type === "text")) {
        return target;
    }
    if (target.isContentEditable) {
        return target; 
    }
    if (target.closest('[contenteditable="true"]')) {
        return target.closest('[contenteditable="true"]');
    }
    return null;
}


function positionButton(element) {
    if (!element) return;
    const rect = element.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

    polishBtn.style.top = `${rect.bottom + scrollTop - 45}px`;
    polishBtn.style.left = `${rect.right + scrollLeft - 90}px`;
    polishBtn.style.display = "flex";
}


document.addEventListener("focusin", (e) => {
    const validElement = getEditableElement(e.target);
    
    if (validElement) {
        currentInput = validElement;
        if (!polishBtn) polishBtn = createButton();
        positionButton(validElement);
    }
});

document.addEventListener("focusout", (e) => {
    setTimeout(() => {
        if (polishBtn && !polishBtn.matches(':hover') && document.activeElement !== currentInput) {
            if (currentInput && currentInput.contains(document.activeElement)) return;
            polishBtn.style.display = "none";
        }
    }, 200);
});


window.addEventListener('resize', () => {
    if (currentInput && polishBtn && polishBtn.style.display !== 'none') {
        positionButton(currentInput);
    }
});