import fs from "fs";

const INVALID_DECK_NAME_ERROR = "Invalid Deck Name";
const NO_CARDS_ERROR = "No Cards Remaining in Deck";
const INVALID_DIVINATION_EVENT_ERROR = "Invalid Divination Event Selected"

/* ********************************************************** *\
    Card Divination Events:
    - (1, 2, 3) Common Deck, Treasure Locations
        o 1: The Tome of Strahd
        o 2: The Holy Symbol of Ravenkind
        o 3: The Sunsword
    - (4) High Deck, Strahd's Enemy
    - (5) High Deck, Strahd's Location in the Castle
\* ********************************************************** */

export class TarrokaDeck {
    constructor() {
        this.tarrokaFortunes = JSON.parse(fs.readFileSync("../assets/fortunes.json", "utf8"));
        this.divinationEvents = ["Common Deck, Treasure Locations", "High Deck, Strahd's Enemy", "High Deck, Strahd's Location in the Castle"];
        
        const deckData = JSON.parse(fs.readFileSync("../assets/deck.json", "utf8"));
        this.unshuffledFullDeck = []
        for (let i = 0; i < deckData.cards.length; i++) {
            for (let j = 0; j < deckData.suits.length; j++) {
                this.unshuffledFullDeck.push(`${deckData.cards[i]} of ${deckData.suits[j]}`);
            }
        }
        for (let i = 0; i < deckData.jokers.length; i++) {
            this.unshuffledFullDeck.push(deckData.jokers[i])
        }
        this.unshuffledCommonDeck = this.unshuffledFullDeck.slice(0, 40)
        this.unshuffledHighDeck = this.unshuffledFullDeck.slice(40)

        this.currentDeck = [...this.unshuffledFullDeck];
    }

    shuffle(deckName) {
        if (deckName === "Full Deck") {
            this.currentDeck = [...this.unshuffledFullDeck];
        } else if (deckName === "Common Deck") {
            this.currentDeck = [...this.unshuffledCommonDeck];
        } else if (deckName === "High Deck") {
            this.currentDeck = [...this.unshuffledHighDeck];
        } else {
            return INVALID_DECK_NAME_ERROR;
        }
        for (let i = this.currentDeck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.currentDeck[i], this.currentDeck[j]] = [this.currentDeck[j], this.currentDeck[i]];
        }
        return 1;
    }

    pullCard() {
        if (this.currentDeck.length > 0) {
            return this.currentDeck.shift();
        } else {
            return NO_CARDS_ERROR;
        }
    }

    getCardName(card) {
        return this.tarrokaFortunes[card]["Name"];
    }

    divineReading(card, event) {
        if (this.divinationEvents.includes(event)) {

            // Handle duplicate meaning cases, (A) or (B)
            if (`${card} (A)` in this.tarrokaFortunes[event]) {
                card = Math.random() < 0.5 ? `${card} (A)` : `${card} (B)`;
            }

            return this.tarrokaFortunes[event][card]["Reading"];
        }

        return INVALID_DIVINATION_EVENT_ERROR;
    }

    discernMeaning(card, event) {
        if (this.divinationEvents.includes(event)) {

            // Handle duplicate meaning cases, (A) or (B)
            if (`${card} (A)` in this.tarrokaFortunes[event]) {
                card = Math.random() < 0.5 ? `${card} (A)` : `${card} (B)`;
                console.log(card);
            }

            return this.tarrokaFortunes[event][card]["Meaning"];
        }
        
        return INVALID_DIVINATION_EVENT_ERROR;
    }
}