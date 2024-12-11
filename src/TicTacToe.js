import React, { useState, useEffect } from "react";

function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  // AI Move Function
  const getBestMove = (board) => {
    for (let i = 0; i < board.length; i++) {
      if (board[i] === null) {
        return i;
      }
    }
    return null;
  };

  const handleClick = (index) => {
    if (board[index] || calculateWinner(board)) return;

    const newBoard = board.slice();
    newBoard[index] = "X"; // Player always plays as 'X'
    setBoard(newBoard);
    setIsXNext(false);
  };

  useEffect(() => {
    if (!isXNext && !calculateWinner(board)) {
      const newBoard = board.slice();
      const aiMove = getBestMove(newBoard);
      if (aiMove !== null) {
        newBoard[aiMove] = "O"; // Machine always plays as 'O'
        setBoard(newBoard);
        setIsXNext(true);
      }
    }
  }, [isXNext, board]);

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  const winner = calculateWinner(board);
  const status = winner
    ? `Winner: ${winner}`
    : `Next player: ${isXNext ? "X" : "O"}`;

  return (
    <div className='App'>
      <header className='App-header'>
        <h1>Tic-Tac-Toe</h1>
        <div className='status'>{status}</div>
        <div className='board'>
          {board.map((value, index) => (
            <button
              key={index}
              className='square'
              onClick={() => handleClick(index)}
            >
              {value}
            </button>
          ))}
        </div>
        <button className='reset-button' onClick={resetGame}>
          Reset Game
        </button>
      </header>
    </div>
  );
}

export default TicTacToe;
