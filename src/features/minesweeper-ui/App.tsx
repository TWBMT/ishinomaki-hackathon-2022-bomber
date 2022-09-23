import React from 'react';
import logo from './logo.svg';
import './App.css';
import { MinesweeperEndEvent } from '../../minesweeper/interfaces/end-events';
import { MinesweeperInterface } from '../../minesweeper/interfaces/minesweeper';
import { SubmitMinesweeperEvents } from '../../minesweeper/interfaces/start-events';

const mockedMinesweeper: MinesweeperInterface = {
  addEndingEventListner: function (event: MinesweeperEndEvent): void {
    throw new Error('Function not implemented.');
  },
  submitUiEvent: function (event: SubmitMinesweeperEvents): void {
    throw new Error('Function not implemented.');
  }
}


function App() {
  const instance: MinesweeperInterface = mockedMinesweeper;
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
