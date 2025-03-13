import { GameMessage } from '../models/Game.js';

export class UI {
    #dealerCardsElement;
    #playerCardsElement;
    #dealerScoreElement;
    #playerScoreElement;
    #messageElement;
    #newGameButton;
    #hitButton;
    #standButton;

    constructor() {
        this.#initializeElements();
        this.#attachEventListeners();
    }

    #initializeElements() {
        this.#dealerCardsElement = document.getElementById('dealer-cards');
        this.#playerCardsElement = document.getElementById('player-cards');
        this.#dealerScoreElement = document.getElementById('dealer-score');
        this.#playerScoreElement = document.getElementById('player-score');
        this.#messageElement = document.getElementById('message');
        this.#newGameButton = document.getElementById('new-game-btn');
        this.#hitButton = document.getElementById('hit-btn');
        this.#standButton = document.getElementById('stand-btn');
    }

    #attachEventListeners() {
        this.onNewGame = null;
        this.onHit = null;
        this.onStand = null;

        this.#newGameButton.addEventListener('click', () => this.onNewGame?.());
        this.#hitButton.addEventListener('click', () => this.onHit?.());
        this.#standButton.addEventListener('click', () => this.onStand?.());
    }

    updateGameState(gameState) {
        this.#updateCards(this.#dealerCardsElement, gameState.dealerCards, !gameState.isGameOver);
        this.#updateCards(this.#playerCardsElement, gameState.playerCards);
        
        this.#dealerScoreElement.textContent = gameState.isGameOver ? 
            `Score: ${gameState.dealerValue}` : 
            'Score: ?';
        
        this.#playerScoreElement.textContent = `Score: ${gameState.playerValue}`;
        this.#messageElement.textContent = gameState.message;

        // Update message styling based on game outcome
        this.#updateMessageStyle(gameState.message);

        // Enable/disable buttons based on game state
        this.#hitButton.disabled = gameState.isGameOver;
        this.#standButton.disabled = gameState.isGameOver;
        this.#newGameButton.disabled = !gameState.isGameOver;
    }

    #updateCards(container, cards, hideFirst = false) {
        container.innerHTML = '';
        cards.forEach((card, index) => {
            const cardElement = document.createElement('div');
            cardElement.className = 'card';
            
            if (hideFirst && index === 1) {
                cardElement.classList.add('hidden-card');
                cardElement.textContent = '?';
            } else {
                cardElement.textContent = card.toString();
                cardElement.setAttribute('data-suit', card.suit);
            }
            
            container.appendChild(cardElement);
        });
    }

    #updateMessageStyle(message) {
        // Reset classes and content
        this.#messageElement.className = 'message';
        this.#messageElement.innerHTML = '';
        
        // Add message text
        const messageText = document.createElement('div');
        messageText.className = 'message-text';
        messageText.textContent = message;
        this.#messageElement.appendChild(messageText);
        
        // Add visible class if there's a message
        if (message) {
            this.#messageElement.classList.add('visible');
            document.querySelector('.message-overlay')?.classList.add('visible');
            
            // Add outcome class based on specific game outcomes
            if (message === GameMessage.getText(GameMessage.DEALER_WIN) || 
                message === GameMessage.getText(GameMessage.PLAYER_BUST) || 
                message === GameMessage.getText(GameMessage.DEALER_BLACKJACK)) {
                this.#messageElement.classList.add('lose');
            } else if (message === GameMessage.getText(GameMessage.DEALER_BUST) || 
                      message === GameMessage.getText(GameMessage.PLAYER_WIN) || 
                      message === GameMessage.getText(GameMessage.PLAYER_BLACKJACK)) {
                this.#messageElement.classList.add('win');
            } else if (message === GameMessage.getText(GameMessage.PUSH) || 
                      message === GameMessage.getText(GameMessage.PUSH_BLACKJACK)) {
                this.#messageElement.classList.add('draw');
            }
        } else {
            this.#messageElement.classList.remove('visible');
            document.querySelector('.message-overlay')?.classList.remove('visible');
        }
    }
} 