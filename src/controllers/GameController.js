import { Game } from '../models/Game.js';
import { UI } from '../views/UI.js';

export class GameController {
    #game;
    #ui;

    constructor() {
        this.#game = new Game();
        this.#ui = new UI();
        this.#setupEventHandlers();
    }

    #setupEventHandlers() {
        this.#ui.onNewGame = () => {
            this.#game.startNewGame();
            this.#updateUI();
        };

        this.#ui.onHit = () => {
            this.#game.playerHit();
            this.#updateUI();
        };

        this.#ui.onStand = () => {
            this.#game.playerStand();
            this.#updateUI();
        };
    }

    #updateUI() {
        this.#ui.updateGameState(this.#game.gameState);
    }
} 