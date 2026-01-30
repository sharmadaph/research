import { makeAutoObservable } from 'mobx';

class GameStore {
  boardSize = 15;
  board = [];
  moveHistory = [];
  currentPlayer = 1; // 1 for black, 2 for white
  gameOver = false;
  winner = null;

  constructor() {
    makeAutoObservable(this);
    this.resetBoard();
  }

  resetBoard() {
    this.board = Array(this.boardSize * this.boardSize).fill(0);
    this.moveHistory = [];
    this.currentPlayer = 1;
    this.gameOver = false;
    this.winner = null;
  }

  makeMove(index) {
    if (this.gameOver || this.board[index] !== 0) {
      return false;
    }

    this.board[index] = this.currentPlayer;
    this.moveHistory.push({
      index,
      player: this.currentPlayer,
      boardState: [...this.board],
    });

    if (this.checkWin(index)) {
      this.gameOver = true;
      this.winner = this.currentPlayer;
    } else {
      this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
    }

    return true;
  }

  checkWin(index) {
    const directions = [
      [1, 0], // horizontal
      [0, 1], // vertical
      [1, 1], // diagonal
      [1, -1], // anti-diagonal
    ];

    const row = Math.floor(index / this.boardSize);
    const col = index % this.boardSize;
    const player = this.board[index];

    for (const [dr, dc] of directions) {
      let count = 1;

      // Check in positive direction
      for (let i = 1; i < 5; i++) {
        const newRow = row + i * dr;
        const newCol = col + i * dc;
        if (newRow < 0 || newRow >= this.boardSize || newCol < 0 || newCol >= this.boardSize) break;
        if (this.board[newRow * this.boardSize + newCol] === player) count++;
        else break;
      }

      // Check in negative direction
      for (let i = 1; i < 5; i++) {
        const newRow = row - i * dr;
        const newCol = col - i * dc;
        if (newRow < 0 || newRow >= this.boardSize || newCol < 0 || newCol >= this.boardSize) break;
        if (this.board[newRow * this.boardSize + newCol] === player) count++;
        else break;
      }

      if (count >= 5) {
        return true;
      }
    }

    return false;
  }

  // Get board state at a specific move number (for replay)
  getBoardAtMove(moveNumber) {
    if (moveNumber < 0) {
      return Array(this.boardSize * this.boardSize).fill(0);
    }
    if (moveNumber >= this.moveHistory.length) {
      return this.moveHistory[this.moveHistory.length - 1]?.boardState || this.board;
    }
    return this.moveHistory[moveNumber].boardState;
  }

  // Get the entire move history (for recording)
  getRecording() {
    return {
      boardSize: this.boardSize,
      moveHistory: this.moveHistory,
      winner: this.winner,
    };
  }

  // Load a recorded game
  loadRecording(recording) {
    this.resetBoard();
    this.boardSize = recording.boardSize;
    recording.moveHistory.forEach((move) => {
      this.makeMove(move.index);
    });
  }
}

export default GameStore;
