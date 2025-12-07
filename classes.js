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
  constructor() {
    this.grid = [
      ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    ];
    this.filledCoordinates = [];
    this.missedShots = [];
    this.ship = new Ship("cruiser");
  }
  placeShip(coordinateOne, coordinateTwo) {
    let lines = "";
    if (
      Number(coordinateTwo[1]) + 1 - Number(coordinateOne[1]) >
      this.ship.length
    ) {
      return `${this.ship.type} ship cannot span coordinates beyond ${this.ship.length}`;
    } else {
      this.filledCoordinates.push(`${coordinateOne}, ${coordinateTwo}`);
      if (coordinateOne[0] === coordinateTwo[0]) {
        for (let i = 0; i < this.ship.length; i++) {
          lines += "-";
        }
      } else {
        for (let i = 0; i < this.ship.length; i++) {
          if (i === this.ship.length - 1) lines += "-";
          else lines += "-\n";
        }
      }
    }

    return lines;
  }

  receiveAttack(coordinateOne, coordinateTwo) {
    //we'll check if coordinate one and coordinate two are equal to the coordinate one and coordinate two of any ship already placed on the grid
    if (this.filledCoordinates.includes(`${coordinateOne}, ${coordinateTwo}`)) {
      this.ship.hit();
    } else {
      this.missedShots.push(`${coordinateOne}, ${coordinateTwo}`);
    }
    return this.ship.hits;
  }
}

class Player {
  constructor(type) {
    this.type = type;
    this.gameboard = new Gameboard();
  }
}

export { Gameboard };
