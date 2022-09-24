interface Cell {
  isOpened: boolean;
  isBomb: boolean;
  bombCount: number;
}

interface MinesweeperState {
  // 横の値
  xLength: number;
  // 縦の値
  yLength: number;
  // 現在のゲームの状態
  status: "init" | "playing" | "clear" | "fail";
  cells: Cell[][];
}

class Minesweeper {
  currentState: MinesweeperState = {
    xLength: 5,
    yLength: 3,
    status: "init",
    cells: [
      [
        { isOpened: false, isBomb: false, bombCount: 1 },
        { isOpened: false, isBomb: false, bombCount: 1 },
        { isOpened: false, isBomb: false, bombCount: 1 },
      ],
      [
        { isOpened: false, isBomb: false, bombCount: 1 },
        { isOpened: false, isBomb: true, bombCount: 0 },
        { isOpened: false, isBomb: false, bombCount: 1 },
      ],
      [
        { isOpened: false, isBomb: false, bombCount: 1 },
        { isOpened: false, isBomb: false, bombCount: 1 },
        { isOpened: false, isBomb: false, bombCount: 1 },
      ],
    ],
  };

  init() {
    // TODO ランダム配置したり

    // TODO 爆弾に合わせて数字計算

    return this.currentState;
  }

  click(indexX: number, indexY: number) {
    const clickedCell = this.currentState.cells[indexY][indexX];
    clickedCell.isOpened = true;

    // もしも爆弾だったら失敗になる。
    if (clickedCell.isBomb) {
      this.currentState.status = "fail";
    }

    // TODO クリックしたセルの周りが爆弾じゃなかったら開く処理を加える。

    // TODO ボムの以外のセルが全てオープンだったらクリアになる。
    if (false) {
      this.currentState.status = "clear";
    }

    return this.currentState;
  }
}

it("クリックしたセルの周りが爆弾じゃなかったら開く処理を加える。", () => {
  const minesweeper = new Minesweeper();
  minesweeper.currentState.cells = [
    [
      { isOpened: false, isBomb: true, bombCount: 0 },
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
  expect(resultCells).toEqual([
    [
      { isBomb: true, bombCount: 0 },
      { isOpened: true, isBomb: false, bombCount: 0 },
      { isOpened: true, isBomb: false, bombCount: 0 },
    ],
    [
      { isOpened: true, isBomb: false, bombCount: 1 },
      { isOpened: true, isBomb: false, bombCount: 1 },
      { isOpened: true, isBomb: false, bombCount: 0 },
    ],
    [
      { isOpened: false, isBomb: true, bombCount: 0 },
      { isOpened: true, isBomb: false, bombCount: 1 },
      { isOpened: true, isBomb: false, bombCount: 0 },
    ],
  ]);
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
