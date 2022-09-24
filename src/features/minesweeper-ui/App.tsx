import React, { useState } from 'react';
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

function NumberColor(val: string) {
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
  value: string,
  isOpen: string,
}

function App() {
  const instance: MinesweeperInterface = mockedMinesweeper;

  const [current, setCurrent] = useState(
      (new Array(12)).fill((new Array(12)).fill({value: 'bomb', isOpen: false}))
  )

  return (
      <>
        <div className={'board'}>
          {current.map((row, rowIndex) => {
            return (
                <div className={'row'}>
                  {row.map(({value, isOpen}: cell, columnIndex: number) => {
                    return (
                        <div
                            className={isOpen ? 'cell_open' : 'cell_close'}
                            onClick={() => {
                              if (!isOpen) {
                                setCurrent(
                                    current.map((rowTmp, rowIndexTmp) => {
                                      return rowTmp.map(({value, isOpen}:cell, columnIndexTmp:number) => {
                                        return (rowIndex === rowIndexTmp && columnIndex === columnIndexTmp) ? {value: value, isOpen: true} : {value: value, isOpen: isOpen}
                                      })
                                    })
                                )
                              }
                            }}
                            style={{color: NumberColor(value)}}
                        >
                            {/* TODO:環境変数でURL切り替え */}
                            {isOpen ? (value === 'bomb' ? (<img src={chrome.runtime.getURL('./bomb.svg')} />) : value) : ''}
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
