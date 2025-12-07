const coordInput = document.getElementById("coord-input");
const errorMsg = document.getElementById("coord-error");
const placeBtn = document.getElementById("place-ship-btn");

// 1. The Validation Function
function validateCoordinate(input) {
  // Regex explanation:
  // ^       = Start of string
  // [A-J]   = First letter must be A through J (case insensitive)
  // (10|[1-9]) = Next is either "10" OR a single digit "1-9"
  // $       = End of string
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

  // Auto-remove the red border after 2 seconds to be nice
  setTimeout(() => {
    coordInput.classList.remove("input-invalid");
  }, 2000);
}

function clearError() {
  errorMsg.textContent = "";
  errorMsg.style.display = "none";
  coordInput.classList.remove("input-invalid");
}

// 3. Connect it to your Button
placeBtn.addEventListener("click", () => {
  const rawInput = coordInput.value.trim();

  // Step A: Check if empty
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
});

// Optional: Clear error when user starts typing again
coordInput.addEventListener("input", clearError);

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
