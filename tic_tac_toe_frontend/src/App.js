import React, { useState, useEffect } from "react";
import "./App.css";

/**
 * Main App Component: Tic Tac Toe Game (PvP Mode)
 * Centered modern UI with header, indicator, board, and reset.
 */
const COLORS = {
  primary: "#1e88e5",
  secondary: "#ffffff",
  accent: "#43a047",
};

const BOARD_SIZE = 3;

// PUBLIC_INTERFACE
function App() {
  // Game state
  const [board, setBoard] = useState(Array(BOARD_SIZE * BOARD_SIZE).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [isDraw, setIsDraw] = useState(false);

  // Reset game
  // PUBLIC_INTERFACE
  const handleReset = () => {
    setBoard(Array(BOARD_SIZE * BOARD_SIZE).fill(null));
    setXIsNext(true);
    setWinner(null);
    setIsDraw(false);
  };

  // Handle a square click
  // PUBLIC_INTERFACE
  const handleClick = (idx) => {
    if (board[idx] || winner) return; // ignore if filled or game over
    const newBoard = board.slice();
    newBoard[idx] = xIsNext ? "X" : "O";
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  };

  // Check for win/draw after each move
  useEffect(() => {
    const detectedWinner = calculateWinner(board);
    setWinner(detectedWinner);
    setIsDraw(!detectedWinner && board.every((sq) => sq));
  }, [board]);

  // Generate board grid
  function renderBoard() {
    let rows = [];
    for (let r = 0; r < BOARD_SIZE; r++) {
      let cells = [];
      for (let c = 0; c < BOARD_SIZE; c++) {
        const idx = r * BOARD_SIZE + c;
        cells.push(
          <Square
            key={idx}
            value={board[idx]}
            onClick={() => handleClick(idx)}
            highlight={
              winner &&
              winner.line &&
              winner.line.includes(idx)
            }
          />
        );
      }
      rows.push(
        <div key={r} className="ttt-row">
          {cells}
        </div>
      );
    }
    return <div className="ttt-grid">{rows}</div>;
  }

  // Determine current status message
  let statusMsg;
  if (winner) {
    statusMsg = (
      <>
        <span style={{ color: COLORS.accent }}>
          Winner: Player {winner.player}
        </span>
      </>
    );
  } else if (isDraw) {
    statusMsg = <>It's a draw!</>;
  } else {
    statusMsg = (
      <>
        <span
          style={{
            color: xIsNext ? COLORS.primary : COLORS.accent,
            fontWeight: 500,
          }}
        >
          Player {xIsNext ? "X" : "O"}
        </span>{" "}
        turn
      </>
    );
  }

  // Final render
  return (
    <div className="ttt-app-bg">
      <div className="ttt-centered">
        <h1 className="ttt-title" style={{ color: COLORS.primary }}>
          Tic Tac Toe
        </h1>
        <div className="ttt-status">{statusMsg}</div>
        {renderBoard()}
        <button className="ttt-reset-btn" onClick={handleReset}>
          Reset Game
        </button>
      </div>
      <footer className="ttt-footer">
        <span>
          <strong>Modern Tic Tac Toe</strong> &mdash; PvP | Minimal UI
        </span>
      </footer>
    </div>
  );
}

// Square cell for Tic Tac Toe board
// PUBLIC_INTERFACE
function Square({ value, onClick, highlight }) {
  return (
    <button
      className={`ttt-square${highlight ? " ttt-highlight" : ""}`}
      onClick={onClick}
      aria-label={value ? `Cell: ${value}` : "Empty cell"}
      tabIndex={0}
    >
      {value}
    </button>
  );
}

// PUBLIC_INTERFACE
function calculateWinner(squares) {
  // Returns {player, line} or null
  const lines = [
    // Rows
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // Cols
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // Diags
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let line of lines) {
    const [a, b, c] = line;
    if (
      squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    ) {
      return { player: squares[a], line };
    }
  }
  return null;
}

export default App;
