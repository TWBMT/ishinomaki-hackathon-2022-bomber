import React, {useCallback, useEffect, useState} from 'react';
import { Unity, useUnityContext } from "react-unity-webgl";
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
  const [bomber, setBomber] = useState<boolean>(false)
  const bombUrl: string = getChromeExtension() ? chrome.runtime.getURL('./bomb.svg') : './bomb.svg';

  const onClickCell = useCallback((x: number, y: number) => {
    const currentState = instance.click(x, y)
    const latestCells = currentState.cells
    setCurrent([...latestCells])

    const latestGameState = currentState.status

    setGameState(latestGameState)
  },[setCurrent, setGameState])

  const { unityProvider } = useUnityContext({
    loaderUrl: chrome.runtime.getURL("Build/WebGLtest.loader.js"),
    dataUrl: chrome.runtime.getURL("Build/WebGLtest.data"),
    frameworkUrl: chrome.runtime.getURL("Build/WebGLtest.framework.js"),
    codeUrl: chrome.runtime.getURL("Build/WebGLtest.wasm"),
  });

  return (
      <>
        <div>
          <Unity unityProvider={unityProvider} style={{ width: '100vw', height: '100vh' }} />
        </div>
        <div className={(gameState === 'fail' || bomber) ? 'bomber' : 'bomber_none'} />
        {gameState === 'clear' ? (
            <div className={gameState === 'clear' ? 'clear' : 'clear_none'}>
              <p>CLEAR!!!!</p>
              <span
                  onClick={() => {
                    setBomber(true);
                    setTimeout(() => {
                      setBomber(false);
                      const clearModal = document.querySelector('.clear');
                      if (clearModal) {
                        clearModal.id = 'clear';
                      }
                    }, 5000)
                  }}
              >
                Click Here
              </span>
            </div>
        ) : (
            <div className={'board'} id={gameState}>
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
                              {isOpened ? (isBomb ? (<img src={bombUrl} alt="bomb"/>) : (bombCount === 0 ? '' : bombCount)) : ''}
                            </div>
                        )
                      })}
                    </div>
                )
              })}
            </div>
        )}
      </>
  );
}

export default App;
