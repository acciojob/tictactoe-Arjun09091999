//your JS code here. If required.
const player1Input = document.getElementById("player-1");
      const player2Input = document.getElementById("player-2");
      const submitButton = document.getElementById("submit");
      const messageDiv = document.querySelector(".message");
      const cells = document.querySelectorAll(".cell");

      let currentPlayer = "X";

      // Event listener for submit button
      submitButton.addEventListener("click", () => {
        const player1 = player1Input.value;
        const player2 = player2Input.value;
        if (player1 && player2) {
          player1Input.disabled = true;
          player2Input.disabled = true;
          submitButton.disabled = true;
          messageDiv.textContent = `${player1}, you're up!`;
          cells.forEach((cell) => {
            cell.addEventListener("click", handleCellClick);
          });
        }
      });

      // Event listener for cell clicks
      function handleCellClick(event) {
        const cell = event.target;
        if (!cell.textContent) {
          cell.textContent = currentPlayer;
          if (checkWin()) {
            messageDiv.textContent = `${getCurrentPlayerName()}, congratulations you won!`;
            cells.forEach((cell) => {
              cell.removeEventListener("click", handleCellClick);
            });
          } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            messageDiv.textContent = `${getCurrentPlayerName()}, you're up!`;
          }
        }
      }

      // Check for a winning combination
      function checkWin() {
        const winningCombinations = [
          [1, 2, 3],
          [4, 5, 6],
          [7, 8, 9],
          [1, 4, 7],
          [2, 5, 8],
          [3, 6, 9],
          [1, 5, 9],
          [3, 5, 7],
        ];

        for (const combination of winningCombinations) {
          const [a, b, c] = combination;
          const cellA = document.getElementById(a);
          const cellB = document.getElementById(b);
          const cellC = document.getElementById(c);
          if (
            cellA.textContent &&
            cellA.textContent === cellB.textContent &&
            cellA.textContent === cellC.textContent
          ) {
            return true;
          }
        }
        return false;
      }

      // Get the current player's name
      function getCurrentPlayerName() {
        return currentPlayer === "X" ? player1Input.value : player2Input.value;
      }
