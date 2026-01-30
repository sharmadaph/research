import React, { useState } from 'react';
import { observer } from 'mobx-react';
import gameStore from '../stores/GameStore';
import ReplayControls from './ReplayControls';

const GomokuGame = observer(() => {
  const [board, setBoard] = useState(Array(15).fill(Array(15).fill(null)));
  const [currentPlayer, setCurrentPlayer] = useState('X');

  const handleCellClick = (row, col) => {
    if (board[row][col] || gameStore.isReplaying) return;

    // Update the board
    const newBoard = board.map((r, rowIndex) =>
      r.map((cell, colIndex) => (rowIndex === row && colIndex === col ? currentPlayer : cell))
    );
    setBoard(newBoard);

    // Record the move
    gameStore.recordMove({ row, col, player: currentPlayer });

    // Switch player
    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
  };

  const renderBoard = () => {
    return board.map((row, rowIndex) => (
      <div key={rowIndex} className="board-row">
        {row.map((cell, colIndex) => (
          <div
            key={colIndex}
            className="board-cell"
            onClick={() => handleCellClick(rowIndex, colIndex)}
          >
            {cell}
          </div>
        ))}
      </div>
    ));
  };

  return (
    <div className="gomoku-game">
      <div className="game-board">{renderBoard()}</div>
      <ReplayControls />
    </div>
  );
});

export default GomokuGame;