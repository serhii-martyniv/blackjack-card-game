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
│── src/
│   ├── models/           # Core game logic classes
│   │   ├── Card.js       # Represents a single card
│   │   ├── Deck.js       # Manages a deck of cards
│   │   ├── Player.js     # Represents a player (or dealer)
│   │   ├── Hand.js       # Manages a player's hand
│   │   ├── Game.js       # Controls the game logic
│   ├── views/            # UI logic
│   │   ├── UI.js         # Handles rendering and event listeners
│   ├── controllers/      # Game flow and event handling
│   │   ├── GameController.js # Connects models and views
│   ├── index.js          # Entry point
│── styles.css            # Styling
│── index.html           # Main game page
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
