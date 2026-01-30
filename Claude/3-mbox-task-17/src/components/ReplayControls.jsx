import React from 'react';
import { observer } from 'mobx-react';

const ReplayControls = observer(({ replayStore }) => {
  if (!replayStore.isReplaying) {
    return null;
  }

  const handleSliderChange = (e) => {
    const newIndex = parseInt(e.target.value, 10);
    replayStore.goToMove(newIndex - 1);
  };

  const handlePlayClick = () => {
    replayStore.play();
  };

  const handlePauseClick = () => {
    replayStore.pause();
  };

  const handleCloseReplay = () => {
    replayStore.stopReplay();
  };

  return (
    <div className="replay-controls">
      <div className="replay-header">
        <h2>Replay Mode</h2>
        <button className="replay-close-btn" onClick={handleCloseReplay}>
          ✕
        </button>
      </div>

      <div className="replay-content">
        <div className="move-display">
          <span className="current-move">
            Move: {replayStore.getCurrentMoveNumber()} / {replayStore.totalMoves}
          </span>
        </div>

        <div className="replay-controls-buttons">
          <button
            className="replay-play-btn"
            onClick={handlePlayClick}
            disabled={replayStore.isPlaying || replayStore.currentMoveIndex >= replayStore.totalMoves - 1}
          >
            ▶ Play
          </button>

          <button
            className="replay-pause-btn"
            onClick={handlePauseClick}
            disabled={!replayStore.isPlaying}
          >
            ⏸ Pause
          </button>
        </div>

        <div className="slider-container">
          <input
            type="range"
            className="replay-slider"
            min="0"
            max={replayStore.totalMoves}
            value={replayStore.currentMoveIndex + 1}
            onChange={handleSliderChange}
            disabled={replayStore.isPlaying}
          />
          <div className="slider-labels">
            <span>0</span>
            <span>{replayStore.totalMoves}</span>
          </div>
        </div>
      </div>
    </div>
  );
});

export default ReplayControls;
