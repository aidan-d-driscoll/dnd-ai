import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { config } from "./curse-of-strahd/src/config.js"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function loadInstructions() {
    const text = fs.readFileSync(path.join(__dirname, "curse-of-strahd", "assets", "instructions.json"), "utf8");
    return JSON.parse(text);
}

function addMessages(obj, messages, prefix = "") {
    for (const [key, value] of Object.entries(obj)) {

        const fullKey = prefix ? `${prefix} > ${key}` : key;

        if (typeof value === "object" && value !== null) {
            addMessages(value, messages, fullKey);
        } 
        
        else {
            messages.push({
                role: "system",
                content: `${fullKey}: ${value}`
            });
        }
    }
}

export default async function askOllama(message, event = null, npc = null) {
    const instructions = loadInstructions();
    
    let assistantRoleInstructions;
    
    if (event == "Roleplay") {
        assistantRoleInstructions = instructions.Roleplay;
    }

    const messages = [{role: "system", content: assistantRoleInstructions}];

    if (npc) {
        const npcs = JSON.parse(fs.readFileSync(config.npcs, "utf8"));
        const npcData = npcs[npc];

        if (npcData) {
            messages.push({role: "system", content: `You are roleplaying as ${npc}`});
            addMessages(npcData, messages);
        }
    }

    messages.push({role: "user", content: `Most recent user message, indicating player decision/dialogue: ${message}`});

    const response = await fetch("http://localhost:11434/api/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "qwen2.5-coder:14b",
            messages: messages,
            stream: false
        })
    });

    const data = await response.json();
    return data.message.content
}