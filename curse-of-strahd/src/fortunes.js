import fsp from 'fs/promises';

import { config } from './config.js';
import TarrokaDeck from '../classes/TarrokaDeck.js';

export default async function readFortunes() {
    const deck = new TarrokaDeck();

    const cardIndexes = {
        "1": "The Tome of Strahd",
        "2": "The Holy Symbol of Ravenkind",
        "3": "The Sunsword",
        "4": "Strahd's Enemy",
        "5": "Strahd's Location in the Castle"
    };

    let commonShuffle = 0;
    let highShuffle = 0;
    const fortunes = {};
    for (let i = 1; i < 6; i++) {

        let deckName;
        let event;

        switch(i) {
            case 1:
            case 2:
            case 3:
                commonShuffle += 1;
                deckName = "Common Deck";
                event = "Common Deck, Treasure Locations";
                break;
            case 4:
            case 5:
                highShuffle += 1;
                deckName = "High Deck";
                event = `${deckName}, ${cardIndexes[i]}`
                break;
        }
        if (commonShuffle === 1  || highShuffle === 1) {
            deck.shuffle(deckName);
        }
        const card = deck.pullCard();
        const divination = deck.getDivination(card, event);
        fortunes[cardIndexes[i]] = {
            "Card": card,
            "Name": divination.Name,
            "Reading": divination.Reading,
            "Meaning": divination.Meaning
        }
    }

    await fsp.writeFile(config.fortunes, JSON.stringify(fortunes, null, 2));
    return 0;
}