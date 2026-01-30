# API Documentation & Usage Guide

## GameStore API

### Properties

```javascript
boardSize; // number: 15 (standard Gomoku board)
board; // array: Current board state [0,1,0,2,0,...]
moveHistory; // array: All moves with metadata
currentPlayer; // number: 1 (Black) or 2 (White)
gameOver; // boolean: Is game finished
winner; // number: Winning player (1 or 2) or null
```

### Methods

#### makeMove(index: number) -> boolean

Make a move at the specified board index.

```javascript
gameStore.makeMove(42); // Place stone at index 42
// Returns: true if move was valid, false otherwise
```

**Parameters:**

- `index`: Board position (0-224 for 15x15 board)

**Returns:** Boolean indicating if move was successful

**Side Effects:**

- Updates board state
- Records move in moveHistory
- Changes currentPlayer
- Checks for win condition
- Sets gameOver and winner if game ends

#### checkWin(index: number) -> boolean

Check if the last move at index creates a winning condition.

```javascript
const isWin = gameStore.checkWin(42);
// Checks horizontal, vertical, and both diagonals
```

#### resetBoard()

Clear the board and reset all game state.

```javascript
gameStore.resetBoard();
```

#### getBoardAtMove(moveNumber: number) -> array

Get the board state at any point in the game.

```javascript
const boardAfter5Moves = gameStore.getBoardAtMove(4); // 0-indexed
const boardBefore1stMove = gameStore.getBoardAtMove(-1); // Empty board
```

**Parameters:**

- `moveNumber`: Move index (0-based), or -1 for empty board

**Returns:** Array representing board state

#### getRecording() -> object

Export the complete game recording.

```javascript
const recording = gameStore.getRecording();
// {
//   boardSize: 15,
//   moveHistory: [{index, player, boardState}, ...],
//   winner: 1
// }
```

#### loadRecording(recording: object)

Load a previously saved recording and replay it.

```javascript
gameStore.loadRecording(savedRecording);
```

---

## ReplayStore API

### Properties

```javascript
isReplaying; // boolean: In replay mode
isPlaying; // boolean: Playback is running
currentMoveIndex; // number: Current position (-1 to totalMoves-1)
totalMoves; // number: Total moves in game
replayBoard; // array: Board state during replay
playbackInterval; // number: 1000 (ms between moves)
intervalId; // number: Interval handle (internal)
```

### Methods

#### startReplay(recording: object)

Initialize replay mode with a game recording.

```javascript
replayStore.startReplay(gameStore.getRecording());
```

**Parameters:**

- `recording`: Object from `gameStore.getRecording()`

**Side Effects:**

- Sets isReplaying to true
- Resets currentMoveIndex to -1
- Sets totalMoves
- Initializes replayBoard to empty state

#### play()

Start automatic playback.

```javascript
replayStore.play();
// Moves advance every 1000ms
```

**Side Effects:**

- Sets isPlaying to true
- Creates interval that calls `nextMove()` every 1000ms
- Automatically stops at end of game

#### pause()

Pause automatic playback.

```javascript
replayStore.pause();
```

**Side Effects:**

- Sets isPlaying to false
- Clears the playback interval
- Board stays at current move

#### nextMove()

Advance to the next move.

```javascript
replayStore.nextMove();
```

**Side Effects:**

- Increments currentMoveIndex
- Updates replayBoard
- Stops if at end of game

#### previousMove()

Go back to the previous move.

```javascript
replayStore.previousMove();
```

**Side Effects:**

- Decrements currentMoveIndex
- Updates replayBoard

#### goToMove(moveIndex: number)

Jump to a specific move.

```javascript
replayStore.goToMove(20); // Go to 21st move (0-indexed)
replayStore.goToMove(-1); // Go to empty board
```

**Parameters:**

- `moveIndex`: Target move (0-based), or -1 for empty board

**Side Effects:**

- Sets currentMoveIndex
- Updates replayBoard immediately

#### updateReplayBoard()

Internal method to synchronize replayBoard with current move.

```javascript
replayStore.updateReplayBoard();
```

#### stopReplay()

Exit replay mode completely.

```javascript
replayStore.stopReplay();
```

**Side Effects:**

- Calls pause()
- Sets isReplaying to false
- Resets all replay state

#### getCurrentMoveNumber() -> number

Get the current move number (1-based for display).

```javascript
const moveNum = replayStore.getCurrentMoveNumber();
// Returns 0 for empty board, 1 for first move, etc.
```

---

## Component Props

### Game Component

```javascript
<Game gameStore={rootStore.gameStore} replayStore={rootStore.replayStore} />
```

**Behavior:**

- Renders 15x15 board
- Handles cell clicks (disabled during replay)
- Shows current player or winner
- Shows "Play Replay" button when game is over

### ReplayControls Component

```javascript
<ReplayControls replayStore={rootStore.replayStore} />
```

**Behavior:**

- Only renders when isReplaying is true
- Shows play/pause buttons
- Shows move slider
- Shows current move counter
- Shows close button

---

## Usage Examples

### Starting a Game

```javascript
const { gameStore, replayStore } = rootStore;

// Player 1 (Black) places stone at index 112 (center area)
gameStore.makeMove(112);

// Player 2 (White) places stone
gameStore.makeMove(113);

// Continue until game ends...
```

### Replaying a Game

```javascript
// After game is complete
if (gameStore.gameOver) {
  // Get recording
  const recording = gameStore.getRecording();

  // Start replay
  replayStore.startReplay(recording);

  // Auto-play
  replayStore.play();

  // Or manually navigate
  replayStore.goToMove(10);
  replayStore.nextMove();
  replayStore.previousMove();
  replayStore.pause();

  // Exit
  replayStore.stopReplay();
}
```

### Analyzing a Game

```javascript
// Get board at specific move
const moveNumber = 15;
const boardAtMove = gameStore.getBoardAtMove(moveNumber - 1);

// Iterate through all moves
gameStore.moveHistory.forEach((move, index) => {
  console.log(`Move ${index + 1}: Player ${move.player} at ${move.index}`);
});
```

---

## Board Index Reference

The board is a 1D array indexed 0-224 for a 15x15 board:

- Index to coordinates: `row = index / 15`, `col = index % 15`
- Coordinates to index: `index = row * 15 + col`

Example:

```
0   1   2  ...  14
15  16  17 ...  29
...
210 211 212... 224
```

---

## MobX Reactivity

All GameStore and ReplayStore properties are observable:

```javascript
import { reaction } from "mobx";

// React to game over
reaction(
  () => gameStore.gameOver,
  (isGameOver) => {
    if (isGameOver) {
      console.log(`Player ${gameStore.winner} wins!`);
    }
  },
);

// React to replay state
reaction(
  () => replayStore.currentMoveIndex,
  (moveIndex) => {
    console.log(`Viewing move ${moveIndex + 1}`);
  },
);
```

---

## UI Element Classes

### Buttons

- `.replay-play-btn`: Play button
- `.replay-pause-btn`: Pause button
- `.replay-close-btn`: Close replay button

### Inputs

- `.replay-slider`: Move navigation slider (type="range")

### Display

- `.current-move`: Move counter text
- `.board`: Main board grid
- `.cell`: Individual board cell
- `.cell.black`: Black stone
- `.cell.white`: White stone

---

## Performance Considerations

1. **Board State**: Using array spreads for immutability (`[...this.board]`)
2. **MobX Optimization**: Only subscribed observers re-render
3. **Interval Management**: Properly cleared in pause/stop methods
4. **Memory**: Move history stored but only referenced during replay
5. **Render**: ReplayControls unmounts when not replaying

---

## Error Handling

The system handles these cases:

- Invalid moves (occupied cells, game over) - silently rejected
- Missing recording data - gracefully handled
- Slider out of bounds - clamped to valid range
- Play button disabled at end of game
- Pause button disabled when not playing
