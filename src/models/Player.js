import { Hand } from './Hand.js';

export class Player {
    #name;
    #hand;
    #isDealer;

    constructor(name, isDealer = false) {
        this.#name = name;
        this.#hand = new Hand();
        this.#isDealer = isDealer;
    }

    get name() {
        return this.#name;
    }

    get hand() {
        return this.#hand;
    }

    get isDealer() {
        return this.#isDealer;
    }

    clearHand() {
        this.#hand.clear();
    }

    addCard(card) {
        this.#hand.addCard(card);
    }

    shouldHit() {
        if (!this.#isDealer) return false;
        return this.#hand.value < 17;
    }
} 