import React, { createContext, useContext } from 'react';
import { observer } from 'mobx-react';
import Game from './components/Game';
import ReplayControls from './components/ReplayControls';
import RootStore from './stores/RootStore';
import './App.css';

const StoreContext = createContext(null);

export const useStore = () => {
  const store = useContext(StoreContext);
  if (!store) {
    throw new Error('useStore must be used within StoreProvider');
  }
  return store;
};

const App = observer(() => {
  const rootStore = React.useMemo(() => new RootStore(), []);

  return (
    <StoreContext.Provider value={rootStore}>
      <div className="app">
        <Game gameStore={rootStore.gameStore} replayStore={rootStore.replayStore} />
        <ReplayControls replayStore={rootStore.replayStore} />
      </div>
    </StoreContext.Provider>
  );
});

export default App;
