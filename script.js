let currentPlayer = 1;
      let player1Name = "";
      let player2Name = "";
      let board = ["", "", "", "", "", "", "", "", ""];

      function startGame() {
        player1Name = document.getElementById("player-1").value;
        player2Name = document.getElementById("player-2").value;

        if (player1Name && player2Name) {
          document.getElementById("player-info").style.display = "none";
          document.getElementById("game-board").style.display = "block";
          document.getElementById("turn-message").textContent =
            player1Name + ", your turn";
        }
      }

      function playMove(cell) {
        if (board[cell - 1] === "") {
          const cellElement = document.getElementById(cell);
          cellElement.textContent = currentPlayer === 1 ? "X" : "O";
          board[cell - 1] = currentPlayer === 1 ? "X" : "O";
          cellElement.style.pointerEvents = "none";

          const result = checkGameResult();
          if (result) {
            document.getElementById("result-message").textContent =
              result === "X"
                ? player1Name + ", congratulations you won!"
                : player2Name + ", congratulations you won!";
            disableCellClick();
          } else {
            currentPlayer = currentPlayer === 1 ? 2 : 1;
            document.getElementById("turn-message").textContent =
              currentPlayer === 1 ? player1Name + ", your turn" : player2Name + ", your turn";
          }
        }
      }

      function checkGameResult() {
        const winningConditions = [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8],
          [2, 4, 6]
        ];

        for (let condition of winningConditions) {
          if (
            board[condition[0]] &&
            board[condition[0]] === board[condition[1]] &&
            board[condition[0]] === board[condition[2]]
          ) {
            return board[condition[0]];
          }
        }

        if (board.every((cell) => cell !== "")) {
          return "draw";
        }

        return null;
      }

      function disableCellClick() {
        const cells = document.getElementsByClassName("cell");
        for (let i = 0; i < cells.length; i++) {
          cells[i].style.pointerEvents = "none";
        }
      }
