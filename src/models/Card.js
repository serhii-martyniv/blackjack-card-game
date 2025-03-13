export class Card {
    #suit;
    #rank;
    #value;

    constructor(suit, rank) {
        this.#suit = suit;
        this.#rank = rank;
        this.#value = this.#calculateValue();
    }

    #calculateValue() {
        if (this.#rank === 'A') return 11;
        if (['K', 'Q', 'J'].includes(this.#rank)) return 10;
        return parseInt(this.#rank);
    }

    get suit() {
        return this.#suit;
    }

    get rank() {
        return this.#rank;
    }

    get value() {
        return this.#value;
    }

    set value(newValue) {
        if (this.#rank === 'A' && (newValue === 1 || newValue === 11)) {
            this.#value = newValue;
        }
    }

    toString() {
        return `${this.#rank}${this.#suit}`;
    }
} 