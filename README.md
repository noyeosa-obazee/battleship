# Battleship 🚢

A browser-based implementation of the classic strategy game Battleship. Built with vanilla JavaScript using Test-Driven Development (TDD) principles.

## 📝 About

This project was created as part of The Odin Project curriculum. The goal was to practice separating application logic from the DOM, implementing a complete game loop, and writing unit tests with Jest.

## ✨ Features

- **Interactive Setup:** Users can place ships by entering coordinates and selecting orientation.
- **Input Validation:** Prevents invalid placements (out of bounds, overlapping ships).
- **Game Loop:** Fully functional turn-based gameplay against a computer opponent.
- **Dynamic UI:** The game board updates in real-time to show hits, misses, and sunken ships.

## 🛠️ Technologies

- HTML5 & CSS3
- JavaScript (ES6+)
- Jest (Unit Testing)

## 🚀 Future Improvements

- **Smart AI:** Currently, the computer attacks random legal coordinates. I plan to implement a "Hunt & Target" algorithm so the AI attacks adjacent squares after scoring a hit.
- **Drag & Drop:** Allowing users to drag ships onto the grid instead of typing coordinates.

## 💻 How to Run

1.  Clone the repository.
2.  Open `index.html` in your browser.
3.  Place your ships and start the battle!
