import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { MinesweeperEndEvent } from '../../minesweeper/interfaces/end-events';
import { MinesweeperInterface } from '../../minesweeper/interfaces/minesweeper';
import { SubmitMinesweeperEvents } from '../../minesweeper/interfaces/start-events';
import getChromeExtension from '../util/chrome-extension';

const mockedMinesweeper: MinesweeperInterface = {
  addEndingEventListner: function (event: MinesweeperEndEvent): void {
    throw new Error('Function not implemented.');
  },
  submitUiEvent: function (event: SubmitMinesweeperEvents): void {
    throw new Error('Function not implemented.');
  }
}

function NumberColor(val: Number) {
  let color: string
  switch (Number(val) % 3) {
    case 0:
      color = '#13965C';
      break
    case 1:
      color = '#064AA5'
      break
    case 2:
      color = '#961B13'
      break
    default:
      color = ''
  }
  return color;
}

type cell = {
  isOpened: boolean,
  isBomb: false,
  bombCount: 1,
}

function App() {
  const instance: MinesweeperInterface = mockedMinesweeper;

  const [current, setCurrent] = useState(
      (new Array(12)).fill((new Array(12)).fill({isOpened: false, isBomb: false, bombCount: 2}))
  )
  const bombUrl: string = getChromeExtension() ? chrome.runtime.getURL('./bomb.svg') : './bomb.svg';
    
  return (
      <>
        <div className={'board'}>
          {current.map((row, rowIndex) => {
            return (
                <div className={'row'}>
                  {row.map(({isOpened, isBomb, bombCount}: cell, columnIndex: number) => {
                    return (
                        <div
                            className={isOpened ? 'cell_open' : 'cell_close'}
                            onClick={() => {
                              if (!isOpened) {
                                setCurrent(
                                    current.map((rowTmp, rowIndexTmp) => {
                                      return rowTmp.map((val:cell, columnIndexTmp:number) => {
                                        return (rowIndex === rowIndexTmp && columnIndex === columnIndexTmp) ? {...val, isOpened: true} : val
                                      })
                                    })
                                )
                              }
                            }}
                            style={{color: NumberColor(bombCount)}}
                        >
                            {isOpened ? (isBomb ? (<img src={bombUrl} alt="bomb"/>) : bombCount) : ''}
                        </div>
                    )
                  })}
                </div>
            )
          })}
        </div>
      </>
  );
}

export default App;
