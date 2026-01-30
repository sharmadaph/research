import React from 'react'
import { observer } from 'mobx-react-lite'
import { gameStore } from '../stores/GameStore'

const SIZE = 15

export const GomokuBoard: React.FC = observer(() => {
  const handleClick = (x: number, y: number) => {
    if (!gameStore.recording) return
    const player: 1 | 2 = (gameStore.moves.length % 2 === 0) ? 1 : 2
    gameStore.recordMove({ x, y, player })
    // Very simple finish condition: first to 10 moves total ends the game for demo
    if (gameStore.moves.length >= 10) {
      gameStore.finishGame()
    }
  }

  const cells = [] as React.ReactNode[]
  const placed = new Map<string, number>()
  for (const m of gameStore.displayedMoves) {
    placed.set(`${m.x},${m.y}`, m.player)
  }

  for (let y = 0; y < SIZE; y++) {
    const row: React.ReactNode[] = []
    for (let x = 0; x < SIZE; x++) {
      const key = `${x},${y}`
      const player = placed.get(key)
      row.push(
        <button
          key={key}
          className={`cell ${player ? (player === 1 ? 'p1' : 'p2') : ''}`}
          onClick={() => handleClick(x, y)}
        >
          {player ? (player === 1 ? '●' : '○') : ''}
        </button>
      )
    }
    cells.push(
      <div key={y} className="row">
        {row}
      </div>
    )
  }

  return <div className="board">{cells}</div>
})
