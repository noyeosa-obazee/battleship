class Ship {
  constructor(type) {
    this.type = type;
    this.length =
      this.type === "carrier"
        ? 5
        : this.type === "battleship"
        ? 4
        : this.type === "cruiser" || this.type === "submarine"
        ? 3
        : this.type === "destroyer"
        ? 2
        : null;
    this.hits = 0;
    this.hasBeenSunk = false;
  }

  hit() {
    this.hits++;
  }

  isSunk() {
    if (this.hits === this.length) {
      this.hasBeenSunk = true;
    } else {
      this.hasBeenSunk = false;
    }
  }
}

class Gameboard {
  constructor(player) {
    this.player = player;
    this.grid = [
      ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    ];
    this.filledCoordinates = [];
    this.missedShots = [];
    // this.ship = new Ship("cruiser");
  }

  placeShip(ship, coordinate, orientation) {
    if (this.player === "user") {
      const cell = document.getElementById(coordinate);
      const selectedShip = new Ship(ship);

      // cell.textContent = "●";
      // cell.classList.add("ship-cell");
      console.log(selectedShip.type);
      if (orientation === "horizontal") {
        if (selectedShip.type === "carrier") {
          for (
            let i = Number(coordinate[1]);
            i < Number(coordinate[1]) + 5;
            i++
          ) {
            this.filledCoordinates.push(`${coordinate[0]}${i}`);
            const targetCell = document.getElementById(`${coordinate[0]}${i}`);
            targetCell.textContent = "●";
            targetCell.classList.add("ship-cell");
          }
        } else if (selectedShip.type === "battleship") {
          for (
            let i = Number(coordinate[1]);
            i < Number(coordinate[1]) + 4;
            i++
          ) {
            this.filledCoordinates.push(`${coordinate[0]}${i}`);
            const targetCell = document.getElementById(`${coordinate[0]}${i}`);
            targetCell.textContent = "●";
            targetCell.classList.add("ship-cell");
          }
        } else if (selectedShip.type === "cruiser") {
          for (
            let i = Number(coordinate[1]);
            i < Number(coordinate[1]) + 3;
            i++
          ) {
            this.filledCoordinates.push(`${coordinate[0]}${i}`);
            const targetCell = document.getElementById(`${coordinate[0]}${i}`);
            targetCell.textContent = "●";
            targetCell.classList.add("ship-cell");
          }
        } else if (selectedShip.type === "submarine") {
          for (
            let i = Number(coordinate[1]);
            i < Number(coordinate[1]) + 3;
            i++
          ) {
            this.filledCoordinates.push(`${coordinate[0]}${i}`);
            const targetCell = document.getElementById(`${coordinate[0]}${i}`);
            targetCell.textContent = "●";
            targetCell.classList.add("ship-cell");
          }
        } else if (selectedShip.type === "destroyer") {
          for (
            let i = Number(coordinate[1]);
            i < Number(coordinate[1]) + 2;
            i++
          ) {
            this.filledCoordinates.push(`${coordinate[0]}${i}`);
            const targetCell = document.getElementById(`${coordinate[0]}${i}`);
            targetCell.textContent = "●";
            targetCell.classList.add("ship-cell");
          }
        }
      } else {
        if (selectedShip.type === "carrier") {
          for (
            let i = coordinate[0].charCodeAt(0);
            i < coordinate[0].charCodeAt(0) + 5;
            i++
          ) {
            this.filledCoordinates.push(
              `${String.fromCharCode(i)}${coordinate.slice(1)}`
            );
            const targetCell = document.getElementById(
              `${String.fromCharCode(i)}${coordinate.slice(1)}`
            );
            targetCell.textContent = "●";
            targetCell.classList.add("ship-cell");
          }
        } else if (selectedShip.type === "battleship") {
          for (
            let i = coordinate[0].charCodeAt(0);
            i < coordinate[0].charCodeAt(0) + 4;
            i++
          ) {
            this.filledCoordinates.push(
              `${String.fromCharCode(i)}${coordinate.slice(1)}`
            );
            const targetCell = document.getElementById(
              `${String.fromCharCode(i)}${coordinate.slice(1)}`
            );
            targetCell.textContent = "●";
            targetCell.classList.add("ship-cell");
          }
        }

        if (selectedShip.type === "cruiser") {
          for (
            let i = coordinate[0].charCodeAt(0);
            i < coordinate[0].charCodeAt(0) + 3;
            i++
          ) {
            this.filledCoordinates.push(
              `${String.fromCharCode(i)}${coordinate.slice(1)}`
            );
            const targetCell = document.getElementById(
              `${String.fromCharCode(i)}${coordinate.slice(1)}`
            );
            targetCell.textContent = "●";
            targetCell.classList.add("ship-cell");
          }
        }

        if (selectedShip.type === "submarine") {
          for (
            let i = coordinate[0].charCodeAt(0);
            i < coordinate[0].charCodeAt(0) + 3;
            i++
          ) {
            this.filledCoordinates.push(
              `${String.fromCharCode(i)}${coordinate.slice(1)}`
            );
            const targetCell = document.getElementById(
              `${String.fromCharCode(i)}${coordinate.slice(1)}`
            );
            targetCell.textContent = "●";
            targetCell.classList.add("ship-cell");
          }
        }

        if (selectedShip.type === "destroyer") {
          for (
            let i = coordinate[0].charCodeAt(0);
            i < coordinate[0].charCodeAt(0) + 2;
            i++
          ) {
            this.filledCoordinates.push(
              `${String.fromCharCode(i)}${coordinate.slice(1)}`
            );
            const targetCell = document.getElementById(
              `${String.fromCharCode(i)}${coordinate.slice(1)}`
            );
            targetCell.textContent = "●";
            targetCell.classList.add("ship-cell");
          }
        }
      }
    } else {
      const selectedShip = new Ship(ship);

      // cell.textContent = "●";
      // cell.classList.add("ship-cell");
      console.log(selectedShip.type);
      if (orientation === "horizontal") {
        if (selectedShip.type === "carrier") {
          for (
            let i = Number(coordinate[1]);
            i < Number(coordinate[1]) + 5;
            i++
          ) {
            this.filledCoordinates.push(`${coordinate[0]}${i}`);
          }
        } else if (selectedShip.type === "battleship") {
          for (
            let i = Number(coordinate[1]);
            i < Number(coordinate[1]) + 4;
            i++
          ) {
            this.filledCoordinates.push(`${coordinate[0]}${i}`);
          }
        } else if (selectedShip.type === "cruiser") {
          for (
            let i = Number(coordinate[1]);
            i < Number(coordinate[1]) + 3;
            i++
          ) {
            this.filledCoordinates.push(`${coordinate[0]}${i}`);
          }
        } else if (selectedShip.type === "submarine") {
          for (
            let i = Number(coordinate[1]);
            i < Number(coordinate[1]) + 3;
            i++
          ) {
            this.filledCoordinates.push(`${coordinate[0]}${i}`);
          }
        } else if (selectedShip.type === "destroyer") {
          for (
            let i = Number(coordinate[1]);
            i < Number(coordinate[1]) + 2;
            i++
          ) {
            this.filledCoordinates.push(`${coordinate[0]}${i}`);
          }
        }
      } else {
        if (selectedShip.type === "carrier") {
          for (
            let i = coordinate[0].charCodeAt(0);
            i < coordinate[0].charCodeAt(0) + 5;
            i++
          ) {
            this.filledCoordinates.push(
              `${String.fromCharCode(i)}${coordinate.slice(1)}`
            );
          }
        } else if (selectedShip.type === "battleship") {
          for (
            let i = coordinate[0].charCodeAt(0);
            i < coordinate[0].charCodeAt(0) + 4;
            i++
          ) {
            this.filledCoordinates.push(
              `${String.fromCharCode(i)}${coordinate.slice(1)}`
            );
          }
        }

        if (selectedShip.type === "cruiser") {
          for (
            let i = coordinate[0].charCodeAt(0);
            i < coordinate[0].charCodeAt(0) + 3;
            i++
          ) {
            this.filledCoordinates.push(
              `${String.fromCharCode(i)}${coordinate.slice(1)}`
            );
          }
        }

        if (selectedShip.type === "submarine") {
          for (
            let i = coordinate[0].charCodeAt(0);
            i < coordinate[0].charCodeAt(0) + 3;
            i++
          ) {
            this.filledCoordinates.push(
              `${String.fromCharCode(i)}${coordinate.slice(1)}`
            );
          }
        }

        if (selectedShip.type === "destroyer") {
          for (
            let i = coordinate[0].charCodeAt(0);
            i < coordinate[0].charCodeAt(0) + 2;
            i++
          ) {
            this.filledCoordinates.push(
              `${String.fromCharCode(i)}${coordinate.slice(1)}`
            );
          }
        }
      }
    }
  }

  receiveAttack(coordinate) {
    if (this.filledCoordinates.includes(coordinate)) {
      // this.ship.hit();
      const hitCell = document.querySelector(`.c-cell#${coordinate}`);
      hitCell.textContent = "✖";
      hitCell.style.color = "red";
    } else {
      this.missedShots.push(coordinate);
      const missedCell = document.querySelector(`.c-cell#${coordinate}`);
      missedCell.textContent = "m";
      missedCell.style.color = "#d3d3d3";
    }
  }
}

class Player {
  constructor(type) {
    this.type = type;
    this.gameboard = new Gameboard(type);
  }
}

export { Gameboard, Player };
