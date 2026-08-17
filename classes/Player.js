import Entity from "./Entity.js";

export default class Player extends Entity {
    constructor(name, health, level) {
        super(name, health);
        this.level = level;
    }

    levelUp() {
        this.level++;
    }
}