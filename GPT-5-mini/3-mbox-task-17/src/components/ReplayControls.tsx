import React from 'react'
import { observer } from 'mobx-react-lite'
import { gameStore } from '../stores/GameStore'

export const ReplayControls: React.FC = observer(() => {
  const max = gameStore.recordedMoves.length

  return (
    <div className="replay-controls">
      <button
        className="replay-play-btn"
        onClick={() => gameStore.startReplay()}
        disabled={gameStore.isReplaying || max === 0}
      >
        Play
      </button>

      <button
        className="replay-pause-btn"
        onClick={() => gameStore.pauseReplay()}
        disabled={!gameStore.isReplaying}
      >
        Pause
      </button>

      <input
        className="replay-slider"
        type="range"
        min={0}
        max={max}
        value={gameStore.currentMoveIndex}
        onChange={(e) => gameStore.seek(Number(e.target.value))}
      />

      <span className="current-move">{gameStore.currentMoveIndex}</span>
    </div>
  )
})
