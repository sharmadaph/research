# Gomoku - Recording & Replay System

A fully functional Gomoku game with automatic game recording and advanced replay capabilities, built with React and MobX.

## Features

### Game Features

- **15x15 Gomoku Board**: Traditional Gomoku gameplay
- **Two-Player Mode**: Black and White players alternate turns
- **Win Detection**: Automatically detects when a player achieves 5 in a row
- **Auto-Recording**: Every game is automatically recorded

### Replay Features

- **Play/Pause Controls**: Control playback of recorded games
- **Move Navigation**: Slider to jump to any move in the game
- **Move Counter**: Display current move number during replay
- **Automatic Playback**: 1000ms interval between each move
- **Move-by-Move Analysis**: Pause to analyze positions

## Project Structure

```
src/
├── stores/
│   ├── GameStore.js        # Game logic and move recording
│   ├── ReplayStore.js      # Replay state management
│   └── RootStore.js        # Combined store for all state
├── components/
│   ├── Game.jsx            # Main game board component
│   └── ReplayControls.jsx  # Replay controls UI
├── App.jsx                 # Root app component
├── App.css                 # All styling
└── index.jsx               # Entry point
```

## State Management with MobX

### GameStore

Manages the game logic and records all moves:

- `board`: Current board state (array of 225 cells)
- `moveHistory`: Array of all moves with board states
- `currentPlayer`: Current player (1=Black, 2=White)
- `gameOver`: Game completion status
- `winner`: Winning player number
- `makeMove(index)`: Make a move at the specified index
- `getBoardAtMove(moveNumber)`: Get board state at any point
- `getRecording()`: Export the complete game recording

### ReplayStore

Manages replay playback:

- `isReplaying`: Whether replay mode is active
- `isPlaying`: Whether replay is currently playing
- `currentMoveIndex`: Current position in replay
- `totalMoves`: Total moves in the game
- `replayBoard`: Board state during replay
- `play()`: Start automatic playback
- `pause()`: Pause playback
- `nextMove()`: Move to next move
- `previousMove()`: Move to previous move
- `goToMove(moveIndex)`: Jump to specific move
- `startReplay(recording)`: Start replaying a game

## Key Components

### Game Component

- Displays the 15x15 Gomoku board
- Handles player moves during gameplay
- Shows game status (current player or winner)
- Displays "Play Replay" button after game ends
- Renders either the live game board or replay board

### ReplayControls Component

- Play/Pause buttons with disabled states
- Move slider for navigation (disabled while playing)
- Current move counter display
- Close button to exit replay mode
- Only visible when in replay mode

## CSS Classes

### Game Board

- `.board`: Main board grid container
- `.cell`: Individual board cell
- `.cell.black`: Black stone
- `.cell.white`: White stone

### Replay Controls

- `.replay-play-btn`: Play button
- `.replay-pause-btn`: Pause button
- `.replay-slider`: Move navigation slider
- `.current-move`: Move counter display
- `.replay-controls`: Main replay controls container
- `.replay-header`: Replay header section
- `.replay-close-btn`: Close replay button

## How to Use

### Installation

```bash
npm install
```

### Running

```bash
npm start
```

The app will open at `http://localhost:3000`

### Playing a Game

1. Click on empty cells to place stones
2. Black always goes first
3. First player to get 5 in a row wins
4. When game ends, click "Play Replay" button

### Replaying a Game

1. Click "Play Replay" after game ends
2. Use Play/Pause buttons to control playback
3. Use the slider to navigate to any move
4. Watch the current move number update
5. Click the X button to exit replay mode

## Technical Details

### Move Recording

Each move is recorded with:

- `index`: Position on the board
- `player`: Which player made the move
- `boardState`: Complete board state after the move

### Win Detection Algorithm

- Checks 4 directions: horizontal, vertical, diagonal, anti-diagonal
- Looks for 5 or more consecutive stones
- Stops checking on first win

### Replay Playback

- Moves are displayed at 1000ms intervals
- Slider can jump to any move when paused
- Board updates automatically as moves are replayed
- Move counter shows progress (e.g., "Move: 5 / 47")

## Technologies Used

- **React 18**: UI rendering
- **MobX 6**: State management
- **CSS3**: Styling and responsive design
- **No Third-party UI Libraries**: Pure HTML/CSS

## Browser Support

Works in all modern browsers that support:

- ES6+ JavaScript
- CSS Grid
- CSS Flexbox
- Range input type

## Future Enhancements

- Network multiplayer support
- Game save/load to localStorage
- Undo/redo functionality
- Different board sizes
- Move time tracking
- Game statistics
