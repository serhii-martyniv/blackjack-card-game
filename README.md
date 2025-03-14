# Blackjack Card Game

A modern implementation of the classic Blackjack card game using vanilla JavaScript, following object-oriented programming principles.

## Features

- Clean and modern user interface
- Proper card game logic following standard Blackjack rules
- Responsive design
- Object-oriented architecture with proper encapsulation

## Game Rules

- The goal is to beat the dealer's hand without going over 21
- Face cards (Jack, Queen, King) are worth 10
- Aces are worth 11 unless that would cause a bust, in which case they become worth 1
- Each player starts with two cards
- The player can choose to 'hit' (take another card) or 'stand' (keep current hand)
- The dealer must hit on 16 and stand on 17

## Project Structure

```
blackjack/
├── src/
│   ├── controllers/
│   │   └── GameController.js    # Game logic and state management
│   ├── models/
│   │   ├── Card.js             # Card class and deck management
│   │   └── Game.js             # Game state and rules
│   ├── utils/
│   │   └── constants.js        # Game constants and configurations
│   ├── views/
│   │   └── UI.js               # DOM manipulation and event handling
│   └── index.js                # Application entry point
├── styles/
│   ├── common.css              # Common styles, variables, and base styles
│   ├── card.css                # Card-specific styles and animations
│   ├── game.css                # Game layout and UI components
│   └── index.css               # Main CSS file importing all styles
├── index.html                  # Main game page
└── README.md                   # Project documentation
```

## How to Run

1. Clone the repository
2. Open the project directory
3. Start a local server (e.g., using Python's `http.server` or VS Code's Live Server)
4. Open the game in your browser

## Development

The project uses modern JavaScript features including:
- ES6+ Classes
- Private fields and methods
- Modules
- Event handling
- DOM manipulation
