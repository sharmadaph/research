import React from 'react';
import { observer } from 'mobx-react';

const Game = observer(({ gameStore, replayStore }) => {
  const handleCellClick = (index) => {
    if (!replayStore.isReplaying) {
      gameStore.makeMove(index);
    }
  };

  const handleReplayClick = () => {
    if (gameStore.gameOver) {
      const recording = gameStore.getRecording();
      replayStore.startReplay(recording);
    }
  };

  // Determine which board to display
  const displayBoard = replayStore.isReplaying ? replayStore.replayBoard : gameStore.board;

  return (
    <div className="game-container">
      <div className="game-header">
        <h1>Gomoku</h1>
        {!replayStore.isReplaying && (
          <div className="game-status">
            {gameStore.gameOver ? (
              <>
                <p>Game Over! Player {gameStore.winner} wins!</p>
                {gameStore.moveHistory.length > 0 && (
                  <button className="replay-play-btn" onClick={handleReplayClick}>
                    Play Replay
                  </button>
                )}
              </>
            ) : (
              <p>Current Player: {gameStore.currentPlayer === 1 ? 'Black' : 'White'}</p>
            )}
          </div>
        )}
      </div>

      <div className="board-container">
        <div className="board">
          {displayBoard.map((cell, index) => (
            <div
              key={index}
              className={`cell ${cell === 1 ? 'black' : cell === 2 ? 'white' : ''}`}
              onClick={() => handleCellClick(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
});

export default Game;
