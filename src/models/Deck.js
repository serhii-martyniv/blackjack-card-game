import { Card } from './Card.js';
import { thoroughShuffle } from '../utils/helpers.js';

export class Deck {
    #cards;
    static #SUITS = ['♠', '♣', '♥', '♦'];
    static #RANKS = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    static #SHUFFLE_ROUNDS = 7; // Casino standard is 7 riffles

    constructor() {
        this.#cards = Deck.#createDeck();
        this.shuffle();
    }

    static #createDeck() {
        const deck = [];
        for (const suit of Deck.#SUITS) {
            for (const rank of Deck.#RANKS) {
                deck.push(new Card(suit, rank));
            }
        }
        return deck;
    }

    shuffle() {
        this.#cards = thoroughShuffle(this.#cards, Deck.#SHUFFLE_ROUNDS);
    }

    drawCard() {
        if (this.#cards.length === 0) {
            this.#cards = Deck.#createDeck();
            this.shuffle();
        }
        return this.#cards.pop();
    }

    get remainingCards() {
        return this.#cards.length;
    }
}