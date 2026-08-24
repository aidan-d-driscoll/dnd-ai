import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import fs from 'fs';
import fsp from 'fs/promises';
import { config } from './config.js';
import readFortunes from './fortunes.js';
import createCharacter from './createCharacter.js';

export default async function initializeGame(saveName) {

    config.dataDir = path.join(__dirname, `../data/${saveName}`);
    config.fortunes = path.join(config.dataDir, "fortunes.json");
    config.npcs = path.join(config.dataDir, "npcs.json");

    if (!fs.existsSync(config.dataDir)) {
        await createSave();
        await readFortunes();
        await createCharacter();
    }
    return 0;
}

async function createSave() {

    const emptyObject = {};

    await fsp.mkdir(config.dataDir, { recursive: true });
    await fsp.writeFile(config.fortunes, JSON.stringify(emptyObject, null, 2));
    await fsp.writeFile(config.npcs, JSON.stringify(emptyObject, null, 2));
    
    return 0;
}