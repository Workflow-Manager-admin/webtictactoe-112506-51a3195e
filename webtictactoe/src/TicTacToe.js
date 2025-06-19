import React, { useState } from "react";

// Color palette
const COLORS = {
  primary: "#4CAF50",
  secondary: "#FFC107",
  accent: "#2196F3",
  background: "#fff",
  cellOutline: "#eee",
  playerX: "#4CAF50",
  playerO: "#2196F3",
};

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
    status = `Winner: ${winner}`;
  } else if (isDraw) {
    status = "It's a draw!";
  } else {
    status = `Turn: ${xIsNext ? "X" : "O"}`;
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

  // Styling for minimal, centered grid
  return (
    <div style={styles.wrapper}>
      <div style={styles.title}>WebTicTacToe</div>
      <div style={styles.status}>
        {status}
        {(winner || isDraw) && (
          <button style={styles.resetButton} onClick={handleReset}>
            Play Again
          </button>
        )}
      </div>
      <div style={styles.board}>
        {board.map((cell, idx) => (
          <button
            key={idx}
            style={{
              ...styles.cell,
              color:
                cell === "X"
                  ? COLORS.playerX
                  : cell === "O"
                  ? COLORS.playerO
                  : COLORS.accent,
              cursor: cell || winner ? "default" : "pointer",
            }}
            onClick={() => handleCellClick(idx)}
            aria-label={`Cell ${idx + 1} ${cell ? "filled" : "empty"}`}
            disabled={!!cell || !!winner}
          >
            {cell}
          </button>
        ))}
      </div>
    </div>
  );
}

// Inline styles
const styles = {
  wrapper: {
    minHeight: "100vh",
    background: COLORS.background,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Inter', 'Roboto', sans-serif",
  },
  title: {
    fontWeight: 700,
    fontSize: "2rem",
    marginBottom: "1em",
    color: COLORS.primary,
    letterSpacing: "0.04em",
  },
  board: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 60px)",
    gridTemplateRows: "repeat(3, 60px)",
    gap: "12px",
    marginBottom: "1.2em",
    background: "#f9f9f9",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
    padding: "24px",
  },
  cell: {
    width: "60px",
    height: "60px",
    fontSize: "2rem",
    fontWeight: 600,
    border: `2px solid ${COLORS.cellOutline}`,
    background: COLORS.background,
    borderRadius: "7px",
    transition: "background 0.18s, border 0.18s",
    outline: "none",
    userSelect: "none",
  },
  status: {
    marginBottom: "0.8em",
    fontWeight: 500,
    fontSize: "1.1rem",
    color: COLORS.accent,
  },
  resetButton: {
    marginLeft: "1.2em",
    padding: "0.4em 1.1em",
    fontSize: "1rem",
    fontWeight: 500,
    border: "none",
    borderRadius: "4px",
    background: COLORS.secondary,
    color: "#fff",
    cursor: "pointer",
    transition: "background 0.2s",
  },
};

export default TicTacToe;
