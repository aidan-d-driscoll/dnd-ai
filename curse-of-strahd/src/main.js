const readline = require("readline")

const { askOllama } = require("../../ollama");
const { TarrokaDeck } = require("../classes/TarrokaDeck.js");

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
    // const response = await askOllama(input);
    const deck = new TarrokaDeck();
    deck.shuffle("High Deck");

    while (true) {
        const input = await ask("Draw Card, or Quit? > ");
        if (input == "Quit") {
            break;
        } else {
            const card = deck.pullCard();
            console.log(card);
            console.log(deck.divineReading(card, "High Deck, Strahd's Enemy"));
            console.log(deck.discernMeaning(card, "High Deck, Strahd's Enemy"));
        }
    }
    console.log(deck.pullCard());

    rl.close()
}

main();