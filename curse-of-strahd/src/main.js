import readline from 'readline';
import initializeGame from "./init.js";
import askOllama from "../../ollama.js";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
}) ;

function ask(question) {
    return new Promise(resolve => {
        rl.question(question, resolve);
    });
}

async function main() {
    
    const saveName = "Testing";
    await initializeGame(saveName);

    // Main Game Loop   
    while (true) {
        
        const input = await ask("> ");
        const response = await askOllama(input, "Roleplay", "Count Strahd von Zarovich");
        console.log(response);

    }

    rl.close()
}

main();