import { Gameboard } from "./classes.js";

test("Check gameboard returns", () => {
  const gameboard = new Gameboard();
  expect(gameboard.placeShip("A3", "C5")).toBe("-\n-\n-");
  expect(gameboard.receiveAttack("A3", "C5")).toBe(1);
});
