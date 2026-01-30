import GameStore from './GameStore';
import ReplayStore from './ReplayStore';

class RootStore {
  gameStore;
  replayStore;

  constructor() {
    this.gameStore = new GameStore();
    this.replayStore = new ReplayStore(this.gameStore);
  }
}

export default RootStore;
