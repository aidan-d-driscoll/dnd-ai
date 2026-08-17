const fs = require("fs");

function loadInstructions() {
    const text = fs.readFileSync("curse-of-strahd/data/instructions.json", "utf8");
    return JSON.parse(text);
}

async function askOllama(message) {
    const instructions = loadInstructions();
    
    const response = await fetch("http://localhost:11434/api/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "qwen2.5-coder:14b",
            messages: [
                {
                    role: "system",
                    content: instructions.system
                },
                {
                    role: "user",
                    content: message
                }
            ],
            stream: false
        })
    });

    const data = await response.json();
    return data.message.content
}

module.exports = { askOllama };