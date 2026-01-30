import { makeAutoObservable, runInAction } from 'mobx'

export type Move = { x: number; y: number; player: 1 | 2 }

class GameStore {
  moves: Move[] = []
  recordedMoves: Move[] = []
  recording = true
  isReplaying = false
  currentMoveIndex = 0
  private timerId: number | null = null

  constructor() {
    makeAutoObservable(this)
  }

  recordMove(move: Move) {
    if (!this.recording) return
    this.moves.push(move)
  }

  finishGame() {
    this.recording = false
    this.recordedMoves = this.moves.slice()
    this.currentMoveIndex = 0
    this.isReplaying = false
    this.clearTimer()
  }

  startReplay() {
    if (this.recordedMoves.length === 0) return
    this.isReplaying = true
    this.currentMoveIndex = 0
    this.clearTimer()
    this.timerId = window.setInterval(() => {
      runInAction(() => {
        if (this.currentMoveIndex < this.recordedMoves.length) {
          this.currentMoveIndex += 1
        } else {
          this.pauseReplay()
        }
      })
    }, 1000)
  }

  pauseReplay() {
    this.isReplaying = false
    this.clearTimer()
  }

  seek(index: number) {
    const clamped = Math.max(0, Math.min(index, this.recordedMoves.length))
    this.currentMoveIndex = clamped
    if (this.isReplaying && clamped === this.recordedMoves.length) {
      this.pauseReplay()
    }
  }

  get displayedMoves(): Move[] {
    if (this.isReplaying) return this.recordedMoves.slice(0, this.currentMoveIndex)
    if (!this.recording) return this.recordedMoves
    return this.moves
  }

  clearTimer() {
    if (this.timerId != null) {
      clearInterval(this.timerId)
      this.timerId = null
    }
  }
}

export const gameStore = new GameStore()
