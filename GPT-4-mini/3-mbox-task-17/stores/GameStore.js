import { makeAutoObservable } from 'mobx';

class GameStore {
  moves = []; // Array to store moves
  currentMoveIndex = 0; // Index of the current move during replay
  isReplaying = false; // Replay state (playing/paused)
  replayInterval = null; // Interval ID for replay

  constructor() {
    makeAutoObservable(this);
  }

  // Record a move
  recordMove(move) {
    this.moves.push(move);
  }

  // Reset the game state
  resetGame() {
    this.moves = [];
    this.currentMoveIndex = 0;
    this.isReplaying = false;
    clearInterval(this.replayInterval);
  }

  // Start replay
  startReplay() {
    if (this.moves.length === 0 || this.isReplaying) return;
    this.isReplaying = true;
    this.replayInterval = setInterval(() => {
      if (this.currentMoveIndex < this.moves.length - 1) {
        this.currentMoveIndex++;
      } else {
        this.pauseReplay();
      }
    }, 1000);
  }

  // Pause replay
  pauseReplay() {
    this.isReplaying = false;
    clearInterval(this.replayInterval);
  }

  // Navigate to a specific move
  goToMove(index) {
    if (index >= 0 && index < this.moves.length) {
      this.currentMoveIndex = index;
    }
  }
}

const gameStore = new GameStore();
export default gameStore;