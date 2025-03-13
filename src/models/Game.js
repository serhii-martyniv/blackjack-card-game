import { Deck } from './Deck.js';
import { Player } from './Player.js';

// Enum for all possible game messages
export const GameMessage = Object.freeze({
    // Blackjack messages
    PUSH_BLACKJACK: Symbol("Push! Both have Blackjack!"),
    PLAYER_BLACKJACK: Symbol("Blackjack! You win!"),
    DEALER_BLACKJACK: Symbol("Dealer has Blackjack! You lose!"),
    
    // Bust messages
    PLAYER_BUST: Symbol("Bust! You lose!"),
    DEALER_BUST: Symbol("Dealer busts! You win!"),
    
    // Regular game outcome messages
    PLAYER_WIN: Symbol("You win!"),
    DEALER_WIN: Symbol("Dealer wins!"),
    PUSH: Symbol("Push! It's a tie!"),
    
    // Clear message
    CLEAR: Symbol(""),

    // Helper method to get message text
    getText(message) {
        return message.description;
    }
});

export class Game {
    #deck;
    #player;
    #dealer;
    #isGameOver;
    #message;

    constructor() {
        this.#deck = new Deck();
        this.#player = new Player('Player');
        this.#dealer = new Player('Dealer', true);
        this.#isGameOver = true;
        this.#message = GameMessage.CLEAR;
    }

    startNewGame() {
        this.#deck = new Deck();
        this.#player.clearHand();
        this.#dealer.clearHand();
        this.#isGameOver = false;
        this.#setMessage(GameMessage.CLEAR);

        // Deal initial cards
        this.#player.addCard(this.#deck.drawCard());
        this.#dealer.addCard(this.#deck.drawCard());
        this.#player.addCard(this.#deck.drawCard());
        this.#dealer.addCard(this.#deck.drawCard());

        // Check for initial blackjack
        if (this.#player.hand.isBlackjack || this.#dealer.hand.isBlackjack) {
            this.#handleBlackjack();
        }
    }

    #handleBlackjack() {
        this.#isGameOver = true;
        if (this.#player.hand.isBlackjack && this.#dealer.hand.isBlackjack) {
            this.#setMessage(GameMessage.PUSH_BLACKJACK);
        } else if (this.#player.hand.isBlackjack) {
            this.#setMessage(GameMessage.PLAYER_BLACKJACK);
        } else {
            this.#setMessage(GameMessage.DEALER_BLACKJACK);
        }
    }

    playerHit() {
        if (this.#isGameOver) return;
        
        this.#player.addCard(this.#deck.drawCard());
        
        if (this.#player.hand.isBusted) {
            this.#isGameOver = true;
            this.#setMessage(GameMessage.PLAYER_BUST);
        }
    }

    playerStand() {
        if (this.#isGameOver) return;

        // Dealer's turn
        while (this.#dealer.shouldHit()) {
            this.#dealer.addCard(this.#deck.drawCard());
        }

        this.#isGameOver = true;
        this.#determineWinner();
    }

    #determineWinner() {
        const playerValue = this.#player.hand.value;
        const dealerValue = this.#dealer.hand.value;

        if (this.#dealer.hand.isBusted) {
            this.#setMessage(GameMessage.DEALER_BUST);
        } else if (playerValue > dealerValue) {
            this.#setMessage(GameMessage.PLAYER_WIN);
        } else if (playerValue < dealerValue) {
            this.#setMessage(GameMessage.DEALER_WIN);
        } else {
            this.#setMessage(GameMessage.PUSH);
        }
    }

    #setMessage(message) {
        // Validate that the message is one of our defined messages
        const validMessages = Object.values(GameMessage).filter(value => typeof value === 'symbol');
        if (!validMessages.includes(message)) {
            throw new Error(`Invalid game message: ${message}`);
        }
        this.#message = message;
    }

    get gameState() {
        return {
            playerCards: this.#player.hand.cards,
            playerValue: this.#player.hand.value,
            dealerCards: this.#dealer.hand.cards,
            dealerValue: this.#dealer.hand.value,
            isGameOver: this.#isGameOver,
            message: GameMessage.getText(this.#message)
        };
    }
} 