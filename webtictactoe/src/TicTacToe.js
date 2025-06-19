import React, { useState } from "react";

/**
 * PUBLIC_INTERFACE
 * Main container for WebTicTacToe
 * Renders the game board, manages state, and displays status/minimal UI.
 */
function TicTacToe() {
  // Player "X" always starts.
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true); // true = X's turn, false = O's turn

  // Helper to check for winner
  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // rows
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // cols
      [0, 4, 8],
      [2, 4, 6], // diags
    ];
    for (let [a, b, c] of lines) {
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  }

  // Prepare status message
  const winner = calculateWinner(board);
  const isDraw = !winner && board.every((cell) => cell !== null);
  let status;
  if (winner) {
    status = (
      <span>
        Winner:{" "}
        <span
          className={
            winner === "X" ? "tictactoe-x" : "tictactoe-o"
          }
        >
          {winner}
        </span>
      </span>
    );
  } else if (isDraw) {
    status = "It's a draw!";
  } else {
    status = (
      <span>
        Turn:{" "}
        <span
          className={
            xIsNext ? "tictactoe-x" : "tictactoe-o"
          }
        >
          {xIsNext ? "X" : "O"}
        </span>
      </span>
    );
  }

  // Handle cell click
  function handleCellClick(idx) {
    if (board[idx] !== null || winner) return; // Ignore if cell filled or game over

    const nextBoard = board.slice();
    nextBoard[idx] = xIsNext ? "X" : "O";
    setBoard(nextBoard);
    setXIsNext(!xIsNext);
  }

  // Optionally: Reset
  function handleReset() {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  }

  return (
    <div className="tictactoe-container">
      <div className="tictactoe-title">WebTicTacToe</div>
      <div className="tictactoe-status">
        {status}
        {(winner || isDraw) && (
          <button
            className="tictactoe-reset-btn"
            onClick={handleReset}
            aria-label="Restart the game"
            autoFocus
          >
            Play Again
          </button>
        )}
      </div>
      <div className="tictactoe-board">
        {board.map((cell, idx) => (
          <button
            key={idx}
            className="tictactoe-cell"
            onClick={() => handleCellClick(idx)}
            aria-label={`Cell ${idx + 1} ${cell ? "filled" : "empty"}`}
            disabled={!!cell || !!winner}
            tabIndex={0}
          >
            {cell && (
              <span className={cell === "X" ? "tictactoe-x" : "tictactoe-o"}>
                {cell}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

export default TicTacToe;
