import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './features/minesweeper-ui/App';
import './index.css';

import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

/**
 * TODO Chrome 拡張ロード時、この index.ts が実行される。
 * その為、React の レンダリングイベントを個々に記載する。
 */