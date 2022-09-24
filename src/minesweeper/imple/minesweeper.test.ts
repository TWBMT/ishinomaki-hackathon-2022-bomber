import { Minesweeper } from "./minesweeper";

it("クリックしたセルの周りが爆弾じゃなかったら開く処理を加える。", () => {
  const minesweeper = new Minesweeper();
  minesweeper.currentState.cells = [
    [
      { isOpened: false, isBomb: false, bombCount: 0 },
      { isOpened: false, isBomb: false, bombCount: 0 },
      { isOpened: false, isBomb: false, bombCount: 0 },
    ],
    [
      { isOpened: false, isBomb: false, bombCount: 1 },
      { isOpened: false, isBomb: false, bombCount: 1 },
      { isOpened: false, isBomb: false, bombCount: 0 },
    ],
    [
      { isOpened: false, isBomb: true, bombCount: 0 },
      { isOpened: false, isBomb: false, bombCount: 1 },
      { isOpened: false, isBomb: false, bombCount: 0 },
    ],
  ];
  const result = minesweeper.click(0, 0);
  const resultCells = result.cells;
  expect(resultCells[2]).toEqual([
    { isOpened: false, isBomb: true, bombCount: 0 },
    { isOpened: true, isBomb: false, bombCount: 1 },
    { isOpened: true, isBomb: false, bombCount: 0 },
  ]);
  // expect(resultCells).toEqual([
  //   [
  //     { isOpened: true, isBomb: false, bombCount: 0 },
  //     { isOpened: true, isBomb: false, bombCount: 0 },
  //     { isOpened: true, isBomb: false, bombCount: 0 },
  //   ],
  //   [
  //     { isOpened: true, isBomb: false, bombCount: 1 },
  //     { isOpened: true, isBomb: false, bombCount: 1 },
  //     { isOpened: true, isBomb: false, bombCount: 0 },
  //   ],
  //   [
  //     { isOpened: false, isBomb: true, bombCount: 0 },
  //     { isOpened: true, isBomb: false, bombCount: 1 },
  //     { isOpened: true, isBomb: false, bombCount: 0 },
  //   ],
  // ]);
});

it("ボムの以外のセルが全てオープンだったらクリアになる", () => {
  const minesweeper = new Minesweeper();
  // 全てのセルをクリック
  minesweeper.click(0, 0);
  minesweeper.click(0, 1);
  minesweeper.click(0, 2);
  minesweeper.click(1, 0);
  minesweeper.click(1, 2);
  minesweeper.click(2, 0);
  minesweeper.click(2, 1);
  const result = minesweeper.click(2, 2);
  expect(result.status).toEqual("clear");
});
