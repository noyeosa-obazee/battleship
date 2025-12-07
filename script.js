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
        // Add data attributes to easily identify coordinates later
        // Coordinates will be 0-9 based
        cell.dataset.row = i - 1;
        cell.dataset.col = j - 1;

        // I might add an event listener for testing
        // cell.addEventListener('click', () => {
        //     console.log(`Clicked on: ${String.fromCharCode(64 + i)}${j}`);
        // });
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
