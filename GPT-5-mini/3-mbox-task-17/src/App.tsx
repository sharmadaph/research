import React from 'react'
import { GomokuBoard } from './components/GomokuBoard'
import { ReplayControls } from './components/ReplayControls'

export const App: React.FC = () => {
  return (
    <div className="app">
      <h1>Gomoku — Recording & Replay Demo</h1>
      <ReplayControls />
      <GomokuBoard />
    </div>
  )
}

export default App
