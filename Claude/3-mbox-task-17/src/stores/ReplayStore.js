import { makeAutoObservable } from 'mobx';

class ReplayStore {
  isReplaying = false;
  isPlaying = false;
  currentMoveIndex = -1;
  totalMoves = 0;
  replayBoard = [];
  playbackInterval = 1000; // milliseconds between moves
  intervalId = null;

  constructor(gameStore) {
    this.gameStore = gameStore;
    makeAutoObservable(this);
  }

  startReplay(recording) {
    if (!recording || !recording.moveHistory) {
      return;
    }

    this.isReplaying = true;
    this.currentMoveIndex = -1;
    this.totalMoves = recording.moveHistory.length;
    this.replayBoard = Array(this.gameStore.boardSize * this.gameStore.boardSize).fill(0);
  }

  play() {
    if (!this.isReplaying) {
      return;
    }

    this.isPlaying = true;
    this.intervalId = setInterval(() => {
      this.nextMove();
    }, this.playbackInterval);
  }

  pause() {
    this.isPlaying = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  nextMove() {
    if (this.currentMoveIndex < this.totalMoves - 1) {
      this.currentMoveIndex++;
      this.updateReplayBoard();
    } else {
      this.pause();
    }
  }

  previousMove() {
    if (this.currentMoveIndex > -1) {
      this.currentMoveIndex--;
      this.updateReplayBoard();
    }
  }

  goToMove(moveIndex) {
    if (moveIndex >= -1 && moveIndex < this.totalMoves) {
      this.currentMoveIndex = moveIndex;
      this.updateReplayBoard();
    }
  }

  updateReplayBoard() {
    const boardState = this.gameStore.getBoardAtMove(this.currentMoveIndex);
    this.replayBoard = [...boardState];
  }

  stopReplay() {
    this.pause();
    this.isReplaying = false;
    this.currentMoveIndex = -1;
    this.totalMoves = 0;
    this.replayBoard = [];
  }

  getCurrentMoveNumber() {
    return this.currentMoveIndex + 1;
  }
}

export default ReplayStore;
