import express from "express";
import path from "path";
import { fileURLToPath } from "url";

import readline from "readline";
import fsp from "fs/promises";

import initializeGame from "./init.js";
import createCharacter from "./createCharacter.js";
import askOllama from "../../public/ollama.js";


// Pathing
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set up Server
const app = express();

app.use(express.json())

app.use(express.static(path.join(__dirname, "../../public")));

app.post("/api/characters", async (request, response) => {

    const character = await createCharacter(request.body); // Request contains the information sent from the browser
    
    response.json({ // Response is the JSON sent back to the browser JS, where the request was made.
        message: "Character created!",
        character: character
    });

});

app.listen(3000, () => {
    console.log("Game Server running at http://localhost:3000");
});

// Initialize I/O Responsibilities
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
}) ;

function ask(question) {
    return new Promise(resolve => {
        rl.question(question, resolve);
    });
}

// Runs game
async function main() {
    
    const saveName = "Testing";
    await initializeGame(saveName);

    // Main Game Loop   
    while (true) {
        
        const input = await ask("> ");
        const response = await askOllama(
            input,
            "Roleplay",
            "Count Strahd von Zarovich"
        );

        console.log(response);

    }

    rl.close()
}

main();