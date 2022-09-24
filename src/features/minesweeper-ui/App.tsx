import React, { useCallback, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import getChromeExtension from '../util/chrome-extension';
import { Cell,Minesweeper } from '../../minesweeper/imple/minesweeper';

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

const instance = new Minesweeper();
instance.init()

function App() {
  const [current, setCurrent] = useState<Cell[][]>(instance.currentState.cells)
  const [gameState, setGameState] = useState<string>('init')
  const bombUrl: string = getChromeExtension() ? chrome.runtime.getURL('./bomb.svg') : './bomb.svg';

  const onClickCell = useCallback((x: number, y: number) => {
    const currentState = instance.click(x, y)
    const latestCells = currentState.cells
    setCurrent([...latestCells])

    const latestGameState = currentState.status

    setGameState(latestGameState)

  },[setCurrent, setGameState])

  return (
      <>
        <div className={'board'}>
          {current.map((row, rowIndex) => {
            return (
                <div className={'row'} key={rowIndex}>
                  {row.map(({isOpened, isBomb, bombCount}: Cell, columnIndex: number) => {
                    return (
                        <div
                            className={isOpened ? 'cell_open' : 'cell_close'}
                            onClick={()=>onClickCell(columnIndex, rowIndex)}
                            style={{color: NumberColor(bombCount)}}
                            key={columnIndex}
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
