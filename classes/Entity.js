export default class Entity {
    #health;

    constructor(name, health) {
        this.name = name;
        this.#health = health;
    }

    takeDamage(amount) {
        this.#health -= amount;
    }

    isAlive() {
        return this.#health > 0;
    }

    getHealth() {
        return this.#health;
    }
}