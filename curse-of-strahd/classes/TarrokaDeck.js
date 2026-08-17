// Strahd's Enemy. Drawn from the high deck, the fourth card in the card reading determines the location of an NPC who can improve the characters' chances of defeating Strahd. (Some cards offer two possible results, A and B; in such a case, you can pick the one you prefer or that better suits the circumstances of the adventure.) Strahd senses that this NPC is a danger to him and tries to eliminate the threat as quickly as possible. This NPC, whoever it ends up being, gains the following additional action: Insipre. While within sight of Strahd, this character grants inspiration to one player character he or she can see. Each of the NPCs described in this section has a role to play in the adventure, even if that individual isn't indicated in the card reading. For the one so designated, however, the information in this section regarding the NPC's behavior takes precedence over whatever is said elsewhere in these pages; that NPC is extraordinary.
// Strahd's Location in the Castle. Drawn from the hig deck, the fifth card in the chard reading determines the location of the final showdownw ith Strahd-the place in Castle Ravenloft where characters are sure to find im. The first time the characters arrive at the foretold location, Strahd is there, provided he hasn't been forced back into his coffin.

const fs = require("fs");

export default class TarrokaDeck {
    constructor() {
        const fortunes = fs.readFileSync("assets/fortunes.json", "utf8");
        const tarrokaDeckInformation = JSON.parse(fortunes);
        
        const deck = fs.readFileSync("assets/deck.json", "utf8");
        const deckData = JSON.parse(deck);

        const unshuffledDeck = []
        for (let i = 0; i < deckData.suites.length; i++) {
            for (let j = 0; j < deckData.cards.length; j++) {
                unshuffledDeck.push(`${deckData.cards[j]} of ${deckData.suites[i]}`);
            }
        }
        for (let i = 0; i < deckData.jokers.length; i++) {
            unshuffledDeck.push(deckData.jokers[i])
        }

        this.shuffledDeck = shuffleDeck(unshuffledDeck);
    }

    createCommonDeck() {
    }

    createHighDeck() {
    }

    createDeck() {
    }

    pullCard() {

    }
    
    shuffleDeck() {

    }

    divineReading(card) {

    }

    pullMeaning(card) {

    }
}