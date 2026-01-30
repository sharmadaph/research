import React from 'react';
import { observer } from 'mobx-react';
import gameStore from '../stores/GameStore';

const ReplayControls = observer(() => {
  const handlePlay = () => {
    gameStore.startReplay();
  };

  const handlePause = () => {
    gameStore.pauseReplay();
  };

  const handleSliderChange = (event) => {
    const moveIndex = parseInt(event.target.value, 10);
    gameStore.goToMove(moveIndex);
  };

  return (
    <div className="replay-controls">
      <button className="replay-play-btn" onClick={handlePlay} disabled={gameStore.isReplaying}>
        Play
      </button>
      <button className="replay-pause-btn" onClick={handlePause} disabled={!gameStore.isReplaying}>
        Pause
      </button>
      <input
        type="range"
        className="replay-slider"
        min="0"
        max={gameStore.moves.length - 1}
        value={gameStore.currentMoveIndex}
        onChange={handleSliderChange}
      />
      <div className="current-move">Move: {gameStore.currentMoveIndex + 1}</div>
    </div>
  );
});

export default ReplayControls;