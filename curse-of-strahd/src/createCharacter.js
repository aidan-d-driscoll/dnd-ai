import fsp from "fs/promises";

export default async function createCharacter(character) {

    console.log("Creating character:");
    console.log(character);
    
    await fsp.writeFile(
        `characters/${character.name}.json`,
        JSON.stringify(character, null, 4)
    );

    return character;
}