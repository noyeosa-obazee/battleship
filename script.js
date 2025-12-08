const coordInput = document.getElementById("coord-input");
const orientation = document.getElementById("orientation-select");
const errorMsg = document.getElementById("coord-error");
const placeBtn = document.getElementById("place-ship-btn");
const ship = document.getElementById("ship-select");
const startBtn = document.getElementById("start-btn");
const controlsContainer = document.querySelector(".controls-container");
import { Gameboard, Player } from "./classes.js";
import { allCoords } from "./allCoords.js";

const user = new Player("user");
const computer = new Player("computer");
// 1. The Validation Function
function validateCoordinate(input) {
  const regex = /^[A-Ja-j](10|[1-9])$/;

  if (!regex.test(input)) {
    return false;
  }
  return true;
}

// 2. The Helper to Show/Hide Errors
function showError(message) {
  errorMsg.textContent = message;
  errorMsg.style.display = "inline";
  coordInput.classList.add("input-invalid");

  // Remove the red border after 2 seconds to be nice
  setTimeout(() => {
    coordInput.classList.remove("input-invalid");
  }, 2000);
}

function clearError() {
  errorMsg.textContent = "";
  errorMsg.style.display = "none";
  coordInput.classList.remove("input-invalid");
}

// 3. Connect it to the Button
placeBtn.addEventListener("click", () => {
  userPicksShips();
});

function userPicksShips() {
  const rawInput = coordInput.value.trim();

  // Step A: Check if it is empty
  if (!rawInput) {
    showError("Please enter a coordinate!");
    return;
  }

  // Step B: Check format (A1 - J10)
  if (!validateCoordinate(rawInput)) {
    showError("Invalid! Use A-J and 1-10 (e.g., A5)");
    return;
  }

  // Step C: If valid, proceed!
  clearError();
  console.log("Valid coordinate:", rawInput.toUpperCase());

  // ... call your Place Ship logic here ...
  // const gameboard = new Gameboard();

  if (
    !user.gameboard.filledCoordinates[ship.value].coords.includes(
      coordInput.value.toUpperCase()
    )
  ) {
    user.gameboard.placeShip(
      ship.value,
      coordInput.value.toUpperCase(),
      orientation.value
    );
    for (let i = 0; i < ship.options.length; i++) {
      if (ship.options[i].value === ship.value) {
        ship.remove(i);
        break;
      }
    }
  } else {
  }

  if (ship.options.length === 0) {
    startBtn.disabled = false;
    controlsContainer.classList.add("hidden-controls");
    ship.classList.add("vanish");
  }

  // console.log(user.gameboard.filledCoordinates);
}

function computerPicksShips() {
  const shipOptions = [
    "carrier",
    "battleship",
    "cruiser",
    "submarine",
    "destroyer",
  ];

  const orientationOptions = ["horizontal", "vertical"];
  for (let i = 0; i < 5; i++) {
    let ship = shipOptions[0];
    let coordinate = allCoords[Math.floor(Math.random() * allCoords.length)];
    let orientation =
      orientationOptions[Math.floor(Math.random() * orientationOptions.length)];

    if (
      !computer.gameboard.filledCoordinates[ship].coords.includes(coordinate)
    ) {
      computer.gameboard.placeShip(ship, coordinate, orientation);
      for (let i = 0; i < shipOptions.length; i++) {
        if (shipOptions[i] === ship) {
          shipOptions.splice(i, 1);
          break;
        }
      }
    } else {
    }

    if (shipOptions.length === 0) {
    }
  }
  console.log(computer.gameboard.filledCoordinates);
}

// Optional: Clear error when user starts typing again
coordInput.addEventListener("input", clearError);

startBtn.addEventListener("click", () => {
  computerPicksShips();
  const userGameCells = [...document.querySelectorAll(".p-cell")];
  const computerGameCells = [...document.querySelectorAll(".c-cell")];

  for (const cell of userGameCells) {
    cell.addEventListener("click", () => {
      user.gameboard.receiveAttack(cell.id);
    });
  }

  for (const cell of computerGameCells) {
    cell.addEventListener("click", () => {
      computer.gameboard.receiveAttack(cell.id);
    });
  }
});

// Function to create a 10x10 grid with labels
function createGrid(containerId) {
  const gridContainer = document.getElementById(containerId);
  const gridSize = 10;

  // Loop to create 11 rows (1 label row and 10 game rows)
  for (let i = 0; i <= gridSize; i++) {
    // Loop to create 11 columns (1 label col and 10 game cols)
    for (let j = 0; j <= gridSize; j++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");

      // 1. Top-left empty corner
      if (i === 0 && j === 0) {
        cell.classList.add("empty-cell");
      }
      // 2. Top row labels (1-10)
      else if (i === 0) {
        cell.textContent = j;
        cell.classList.add("label-cell");
      }
      // 3. Left column labels (A-J)
      else if (j === 0) {
        // Use ASCII code to get letters: A is 65
        cell.textContent = String.fromCharCode(64 + i);
        cell.classList.add("label-cell");
      }
      // 4. The actual game board cells
      else {
        cell.classList.add("game-cell");

        cell.classList.add(containerId === "player-grid" ? "p-cell" : "c-cell");

        cell.id = `${String.fromCharCode(64 + i)}${j}`;
      }

      gridContainer.appendChild(cell);
    }
  }
}

// Generate both grids when the page loads
document.addEventListener("DOMContentLoaded", () => {
  createGrid("player-grid");
  createGrid("opponent-grid");
});
