const readline = require("readline")
const { askOllama } = require("../../ollama");

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
    const input = await ask("> ");
    const response = await askOllama(input);
    console.log(response);
    rl.close()
}

main();