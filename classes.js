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
    this.coords = [];
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
    this.filledCoordinates = {
      carrier: new Ship("carrier"),
      battleship: new Ship("battleship"),
      cruiser: new Ship("cruiser"),
      submarine: new Ship("submarine"),
      destroyer: new Ship("destroyer"),
    };
    this.missedShots = [];
  }

  placeShip(ship, coordinate, orientation) {
    if (this.player === "user") {
      const cell = document.getElementById(coordinate);
      const selectedShip = new Ship(ship);

      console.log(selectedShip.type);
      if (orientation === "horizontal") {
        if (selectedShip.type === "carrier") {
          for (
            let i = Number(coordinate[1]);
            i < Number(coordinate[1]) + 5;
            i++
          ) {
            this.filledCoordinates.carrier.coords.push(`${coordinate[0]}${i}`);

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
            this.filledCoordinates.battleship.coords.push(
              `${coordinate[0]}${i}`
            );
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
            this.filledCoordinates.cruiser.coords.push(`${coordinate[0]}${i}`);
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
            this.filledCoordinates.submarine.coords.push(
              `${coordinate[0]}${i}`
            );
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
            this.filledCoordinates.destroyer.coords.push(
              `${coordinate[0]}${i}`
            );
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
            this.filledCoordinates.carrier.coords.push(
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
            this.filledCoordinates.battleship.coords.push(
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
            this.filledCoordinates.cruiser.coords.push(
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
            this.filledCoordinates.submarine.coords.push(
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
            this.filledCoordinates.destroyer.coords.push(
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
            this.filledCoordinates.carrier.coords.push(`${coordinate[0]}${i}`);
          }
        } else if (selectedShip.type === "battleship") {
          for (
            let i = Number(coordinate[1]);
            i < Number(coordinate[1]) + 4;
            i++
          ) {
            this.filledCoordinates.battleship.coords.push(
              `${coordinate[0]}${i}`
            );
          }
        } else if (selectedShip.type === "cruiser") {
          for (
            let i = Number(coordinate[1]);
            i < Number(coordinate[1]) + 3;
            i++
          ) {
            this.filledCoordinates.cruiser.coords.push(`${coordinate[0]}${i}`);
          }
        } else if (selectedShip.type === "submarine") {
          for (
            let i = Number(coordinate[1]);
            i < Number(coordinate[1]) + 3;
            i++
          ) {
            this.filledCoordinates.submarine.coords.push(
              `${coordinate[0]}${i}`
            );
          }
        } else if (selectedShip.type === "destroyer") {
          for (
            let i = Number(coordinate[1]);
            i < Number(coordinate[1]) + 2;
            i++
          ) {
            this.filledCoordinates.destroyer.coords.push(
              `${coordinate[0]}${i}`
            );
          }
        }
      } else {
        if (selectedShip.type === "carrier") {
          for (
            let i = coordinate[0].charCodeAt(0);
            i < coordinate[0].charCodeAt(0) + 5;
            i++
          ) {
            this.filledCoordinates.carrier.coords.push(
              `${String.fromCharCode(i)}${coordinate.slice(1)}`
            );
          }
        } else if (selectedShip.type === "battleship") {
          for (
            let i = coordinate[0].charCodeAt(0);
            i < coordinate[0].charCodeAt(0) + 4;
            i++
          ) {
            this.filledCoordinates.battleship.coords.push(
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
            this.filledCoordinates.cruiser.coords.push(
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
            this.filledCoordinates.submarine.coords.push(
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
            this.filledCoordinates.destroyer.coords.push(
              `${String.fromCharCode(i)}${coordinate.slice(1)}`
            );
          }
        }
      }
    }
  }

  receiveAttack(coordinate) {
    if (this.player === "user") {
      if (
        document.querySelector(`.p-cell#${coordinate}`).textContent &&
        document.querySelector(`.p-cell#${coordinate}`).textContent !== "●"
      ) {
        return false;
      }

      const targetShip =
        this.filledCoordinates[
          objectTargetKey(this.filledCoordinates, coordinate)
        ];
      if (targetShip) {
        targetShip.hit();
        targetShip.isSunk();
        const hitCell = document.querySelector(`.p-cell#${coordinate}`);
        hitCell.textContent = "✖";
        hitCell.style.color = "red";
        if (targetShip.hasBeenSunk) {
          console.log(targetShip.type + " has been sunk");
        }
      } else {
        this.missedShots.push(coordinate);
        const missedCell = document.querySelector(`.p-cell#${coordinate}`);
        missedCell.textContent = "m";
        missedCell.style.color = "#d3d3d3";
      }
    } else {
      if (
        !document.querySelector(`.c-cell#${coordinate}`).textContent ||
        document.querySelector(`.c-cell#${coordinate}`).textContent === "●"
      ) {
        const targetShip =
          this.filledCoordinates[
            objectTargetKey(this.filledCoordinates, coordinate)
          ];
        if (targetShip) {
          targetShip.hit();
          targetShip.isSunk();
          const hitCell = document.querySelector(`.c-cell#${coordinate}`);
          hitCell.textContent = "✖";
          hitCell.style.color = "red";
          if (targetShip.hasBeenSunk) {
            console.log(targetShip.type + " has been sunk");
          }
        } else {
          this.missedShots.push(coordinate);
          const missedCell = document.querySelector(`.c-cell#${coordinate}`);
          missedCell.textContent = "m";
          missedCell.style.color = "#d3d3d3";
        }
      }
    }
  }
}

function objectTargetKey(obj, value) {
  for (const key in obj) {
    if (obj[key].coords.includes(value)) {
      return key;
    }
  }
  return null;
}

class Player {
  constructor(type) {
    this.type = type;
    this.gameboard = new Gameboard(type);
  }
}

export { Gameboard, Player };
