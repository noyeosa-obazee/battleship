const coordInput = document.getElementById("coord-input");
const orientation = document.getElementById("orientation-select");
const errorMsg = document.getElementById("coord-error");
const placeBtn = document.getElementById("place-ship-btn");
const ship = document.getElementById("ship-select");
const startBtn = document.getElementById("start-btn");
const controlsContainer = document.querySelector(".controls-container");
const turnTeller = document.getElementById("turn-teller");
const infoGiver = document.getElementById("info-giver");
import { Player } from "./classes.js";
import { allCoords } from "./allCoords.js";

const SHIP_LENGTHS = {
  carrier: 5,
  battleship: 4,
  cruiser: 3,
  submarine: 3,
  destroyer: 2,
};

function isPlacementValid(shipName, coordinate, orientation) {
  const length = SHIP_LENGTHS[shipName.toLowerCase()];

  if (orientation === "horizontal") {
    if (Number(coordinate.slice(1)) + length - 1 > 10) {
      return false;
    }
  } else {
    // Vertical Logic
    const distance = "J".charCodeAt(0) - coordinate[0].charCodeAt(0);
    if (distance + 1 < length) {
      return false;
    }
  }
  return true;
}

const user = new Player("user");
const computer = new Player("computer");
let turn = "user";
let gameOver = false;
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

  if (
    !isPlacementValid(ship.value, rawInput.toUpperCase(), orientation.value)
  ) {
    showError(
      `That ship is too long to fit there! (Length: ${
        SHIP_LENGTHS[ship.value]
      })`
    );
    return;
  }

  if (
    Object.keys(user.gameboard.filledCoordinates)
      .map((ship) => user.gameboard.filledCoordinates[ship].coords)
      .some((arr) => arr.includes(rawInput.toUpperCase()))
  ) {
    showError("There is already a ship in this coordinate!");
    return;
  }

  if (willBecomeTaken(ship.value, rawInput.toUpperCase(), orientation.value)) {
    showError("Coordinate will conflict with that of another ship");
    return;
  }

  // Step C: If its valid, proceed!
  clearError();
  console.log("Valid coordinate:", rawInput.toUpperCase());

  // ... call your Place Ship logic here ...
  // const gameboard = new Gameboard();

  user.gameboard.placeShip(
    ship.value,
    rawInput.toUpperCase(),
    orientation.value
  );
  for (let i = 0; i < ship.options.length; i++) {
    if (ship.options[i].value === ship.value) {
      ship.remove(i);
      break;
    }
  }

  if (ship.options.length === 0) {
    startBtn.disabled = false;
    controlsContainer.classList.add("hidden-controls");
    ship.classList.add("vanish");
  }

  // console.log(user.gameboard.filledCoordinates);
}

function willBecomeTaken(ship, coordinate, orientation) {
  const arr = [];
  if (orientation === "horizontal") {
    for (let i = Number(coordinate.slice(1)); i < SHIP_LENGTHS[ship]; i++) {
      if (
        Object.keys(user.gameboard.filledCoordinates)
          .map((ship) => user.gameboard.filledCoordinates[ship].coords)
          .some((arr) => arr.includes(`${coordinate[0]}${i}`))
      ) {
        return true;
      }
    }
  } else {
    for (
      let i = coordinate[0].charCodeAt(0);
      i < coordinate[0].charCodeAt(0) + SHIP_LENGTHS[ship];
      i++
    ) {
      if (
        Object.keys(user.gameboard.filledCoordinates)
          .map((ship) => user.gameboard.filledCoordinates[ship].coords)
          .some((arr) =>
            arr.includes(`${String.fromCharCode(i)}${coordinate.slice(1)}`)
          )
      ) {
        return true;
      }
    }
  }

  return false;
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
    let coordinate, orientation;
    let valid = false;

    while (!valid) {
      coordinate = allCoords[Math.floor(Math.random() * allCoords.length)];
      orientation =
        orientationOptions[
          Math.floor(Math.random() * orientationOptions.length)
        ];

      const isOutOfBounds = !isPlacementValid(ship, coordinate, orientation);
      const isCollision = willBecomeTaken(ship, coordinate, orientation);

      if (!isOutOfBounds && !isCollision) {
        valid = true;
      }
    }

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

coordInput.addEventListener("input", clearError);

startBtn.addEventListener("click", () => {
  if (!gameOver && startBtn.textContent !== "Restart Game") {
    turnTeller.textContent = "Your turn";
    startBtn.textContent = "Restart Game";
    computerPicksShips();

    const computerGameCells = [...document.querySelectorAll(".c-cell")];

    for (const cell of computerGameCells) {
      cell.addEventListener("click", () => {
        if (turn === "user" && !gameOver) {
          if (!document.querySelector(`.c-cell#${cell.id}`).textContent) {
            turnTeller.textContent = "Your turn";

            computer.gameboard.receiveAttack(cell.id);
            checkForSink();
            checkForWinner();
            turn = "computer";
            turnTeller.textContent = "Computer's turn";
            wait(3000)
              .then(() => {
                computerAttacks();
                return wait(0);
              })
              .then(() => {
                turnTeller.textContent = "Your turn";
              });
          }
        }
      });
    }

    const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  } else if (!gameOver && startBtn.textContent === "Restart Game") {
    window.location.reload();
  } else {
    window.location.reload();
  }
});

function computerAttacks() {
  const userGameCells = [...document.querySelectorAll(".p-cell")];
  const notValidCells = userGameCells
    .filter(
      (cell) =>
        document.querySelector(`.p-cell#${cell.id}`).textContent &&
        document.querySelector(`.p-cell#${cell.id}`).textContent !== "●"
    )
    .map((cell) => cell.id);
  const validCells = userGameCells.filter(
    (cell) => !notValidCells.includes(cell.id)
  );
  let targetCell = validCells[Math.floor(Math.random() * validCells.length)];

  user.gameboard.receiveAttack(targetCell.id);
  checkForSink();
  checkForWinner();

  turn = "user";
}

function checkForSink() {
  if (
    Object.keys(user.gameboard.filledCoordinates).some(
      (ship) =>
        user.gameboard.filledCoordinates[ship].hits ===
        user.gameboard.filledCoordinates[ship].length
    )
  ) {
    const sunkShip = Object.keys(user.gameboard.filledCoordinates)
      .filter(
        (ship) =>
          user.gameboard.filledCoordinates[ship].hits ===
          user.gameboard.filledCoordinates[ship].length
      )
      .at(-1);
    console.log(`User's ${sunkShip} has been sunk!`);
    infoGiver.classList.remove("hidden-controls");
    infoGiver.textContent = `Your ${sunkShip} has been sunk!`;
  } else if (
    Object.keys(computer.gameboard.filledCoordinates).some(
      (ship) =>
        computer.gameboard.filledCoordinates[ship].hits ===
        computer.gameboard.filledCoordinates[ship].length
    )
  ) {
    const sunkShip = Object.keys(computer.gameboard.filledCoordinates)
      .filter(
        (ship) =>
          computer.gameboard.filledCoordinates[ship].hits ===
          computer.gameboard.filledCoordinates[ship].length
      )
      .at(-1);
    console.log(`Computer's ${sunkShip} has been sunk!`);
    infoGiver.classList.remove("hidden-controls");
    infoGiver.textContent = `Computer\'s ${sunkShip} has been sunk!`;
  }
}

function checkForWinner() {
  if (
    Object.keys(user.gameboard.filledCoordinates).every(
      (ship) =>
        user.gameboard.filledCoordinates[ship].hits ===
        user.gameboard.filledCoordinates[ship].length
    )
  ) {
    console.log("User wins!");
    infoGiver.textContent = "Yout win!";
    gameOver = true;
    startBtn.textContent = "Play Again";
    startBtn.disabled = false;
    turnTeller.textContent = "";
  } else if (
    Object.keys(computer.gameboard.filledCoordinates).every(
      (ship) =>
        computer.gameboard.filledCoordinates[ship].hits ===
        computer.gameboard.filledCoordinates[ship].length
    )
  ) {
    console.log("Computer wins!");
    infoGiver.textContent = "Computer wins!";
    gameOver = true;
    startBtn.textContent = "Play Again";
    startBtn.disabled = false;
    turnTeller.textContent = "";
  }
}

function createGrid(containerId) {
  const gridContainer = document.getElementById(containerId);
  const gridSize = 10;

  for (let i = 0; i <= gridSize; i++) {
    for (let j = 0; j <= gridSize; j++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");

      if (i === 0 && j === 0) {
        cell.classList.add("empty-cell");
      } else if (i === 0) {
        cell.textContent = j;
        cell.classList.add("label-cell");
      } else if (j === 0) {
        cell.textContent = String.fromCharCode(64 + i);
        cell.classList.add("label-cell");
      } else {
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
