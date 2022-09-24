export interface Cell {
  isOpened: boolean;
  isBomb: boolean;
  bombCount: number;
}

export interface MinesweeperState {
  // 横の値
  xLength: number;
  // 縦の値
  yLength: number;
  // 現在のゲームの状態
  status: "init" | "playing" | "clear" | "fail";
  cells: Cell[][];
}

export class Minesweeper {
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
    const cells: Cell[][] = new Array(25).fill(null).map((_) => {
      return new Array(25)
        .fill(null)
        .map((_) => ({ isOpened: false, isBomb: false, bombCount: 0 }));
    });
    cells.forEach((row, rowIdx) => {
      row.forEach((cell, colmnIdx) => {
        if (rowIdx === 5 && colmnIdx === 5) {
          console.log(cell.isBomb);
          cell.isBomb = true;
        }
      });
    });
    this.currentState.cells = [...cells];
    return this.currentState;
  }

  click(indexX: number, indexY: number) {
    this.currentState.status = "playing";

    const clickedCell = this.currentState.cells[indexY][indexX];
    const beforeCell = { ...clickedCell };
    clickedCell.isOpened = true;

    // もしも爆弾だったら失敗になる。
    if (clickedCell.isBomb) {
      this.currentState.status = "fail";
      return this.currentState;
    }

    // TODO クリックしたセルの周りが爆弾じゃなかったら開く処理を加える。
    this.openableCell(beforeCell, indexX, indexY);

    // TODO ボムの以外のセルが全てオープンだったらクリアになる。
    if (this.isClear()) {
      this.currentState.status = "clear";
    }

    return this.currentState;
  }

  private openableCell(beforeCell: Cell, indexX: number, indexY: number) {
    // ボムのセルをクリック、もしくは解放済みのセルをクリックした場合、以降の処理を行わない。
    if (beforeCell.isBomb || beforeCell.isOpened) {
      // この先の処理は実行されない
      return;
    }

    // 真横（右）
    const クリックした行 = this.currentState.cells[indexY];
    this.右側を見る(クリックした行, indexX);

    // 真横（左）
    this.左側を見る(クリックした行, indexX);

    // 真上
    this.上側を見る(indexY, indexX);

    // 真下
    this.下側を見る(indexY, indexX);

    // 右に行って上下を見る
    // 右に移動している
    for (let x = indexX; x < クリックした行.length; x++) {
      this.下側を見る(indexY, x);
      this.上側を見る(indexY, x);
    }

    // 上側
    // 一番上 = 0 行目
    // y は 0 より大きい
    for (let y = indexY; 0 <= y; y--) {
      const row = this.currentState.cells[y];
      this.右側を見る(row, indexX);
      this.左側を見る(row, indexX);
    }

    // 下側
    for (let y = indexY; y < this.currentState.cells.length; y++) {
      const row = this.currentState.cells[y];
      this.右側を見る(row, indexX);
      this.左側を見る(row, indexX);
    }
  }

  private 上側を見る(indexY: number, indexX: number) {
    for (let y = indexY; y >= 0; y--) {
      const cell = this.currentState.cells[y][indexX];
      const { isOpend, continueScan } = this.checkCell(cell);
      cell.isOpened = isOpend;
      if (!continueScan) {
        break;
      }
    }
  }

  private 下側を見る(indexY: number, indexX: number) {
    for (let y = indexY; y < this.currentState.cells.length; y++) {
      const cell = this.currentState.cells[y][indexX];
      const { isOpend, continueScan } = this.checkCell(cell);
      cell.isOpened = isOpend;
      if (!continueScan) {
        break;
      }
    }
  }

  private 右側を見る(row: Cell[], indexX: number) {
    for (let i = indexX; i < row.length; i++) {
      const cell = row[i];
      const { isOpend, continueScan } = this.checkCell(cell);
      cell.isOpened = isOpend;
      if (!continueScan) {
        break;
      }
    }
  }

  private 左側を見る(row: Cell[], indexX: number) {
    for (let i = indexX; 0 < i; i--) {
      const cell = row[i];
      const { isOpend, continueScan } = this.checkCell(cell);
      cell.isOpened = isOpend;
      if (!continueScan) {
        break;
      }
    }
  }

  private checkCell(cell: Cell) {
    // ボムの場合
    //  開くかどうか isOpend = false
    //  走査を続けるかどうか continueScan = false
    if (cell.isBomb) {
      return { isOpend: false, continueScan: false };
    }

    // 数字の場合
    //  開くかどうか isOpend = true
    //  走査を続けるかどうか continueScan = false
    if (cell.bombCount > 0) {
      return { isOpend: true, continueScan: false };
    }

    // 数字の場合
    //  開くかどうか isOpend = true
    //  走査を続けるかどうか continueScan = true
    return { isOpend: true, continueScan: true };
  }

  private isClear() {
    let isClear = true;
    this.currentState.cells.forEach((row) => {
      row.forEach((cell) => {
        if (!cell.isBomb && !cell.isOpened) {
          isClear = false;
        }
      });
    });
    return isClear;
  }
}
