import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders Tic Tac Toe title', () => {
  render(<App />);
  const title = screen.getByText(/Tic Tac Toe/i);
  expect(title).toBeInTheDocument();
});

test('renders empty squares initially', () => {
  render(<App />);
  const squares = screen.getAllByRole("button", { name: /Empty cell/i });
  expect(squares.length).toBe(9);
});

test('play PvP game and detects winner', () => {
  render(<App />);
  const squares = screen.getAllByRole("button");
  // X plays 0
  fireEvent.click(squares[0]);
  // O plays 1
  fireEvent.click(squares[1]);
  // X plays 3
  fireEvent.click(squares[3]);
  // O plays 2
  fireEvent.click(squares[2]);
  // X plays 6 (winning move)
  fireEvent.click(squares[6]);
  // Confirm winner displayed
  const winnerDisplay = screen.getByText(/Winner: Player X/i);
  expect(winnerDisplay).toBeInTheDocument();
});

test('reset button shows and clears board', () => {
  render(<App />);
  const squares = screen.getAllByRole("button");
  fireEvent.click(squares[0]);
  const resetBtn = screen.getByRole("button", { name: /Reset Game/i });
  fireEvent.click(resetBtn);
  // All squares should be empty again
  const emptyAgain = screen.getAllByRole("button", { name: /Empty cell/i });
  expect(emptyAgain.length).toBe(9);
});
