export class Hand {
    #cards;

    constructor() {
        this.#cards = [];
    }

    addCard(card) {
        this.#cards.push(card);
    }

    clear() {
        this.#cards = [];
    }

    get cards() {
        return [...this.#cards];
    }

    get value() {
        let value = 0;
        let aces = 0;

        // First sum all non-ace cards
        for (const card of this.#cards) {
            if (card.rank === 'A') {
                aces++;
            } else {
                value += card.value;
            }
        }

        // Add aces
        for (let i = 0; i < aces; i++) {
            if (value + 11 <= 21) {
                value += 11;
            } else {
                value += 1;
            }
        }

        return value;
    }

    get isBusted() {
        return this.value > 21;
    }

    get isBlackjack() {
        return this.#cards.length === 2 && this.value === 21;
    }
} 